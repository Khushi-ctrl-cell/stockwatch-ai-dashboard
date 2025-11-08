import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ticker, timeframe = "1Y" } = await req.json();

    if (!ticker) {
      throw new Error("Ticker symbol is required");
    }

    // Calculate date range based on timeframe
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeframe) {
      case "1Y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      case "5Y":
        startDate.setFullYear(endDate.getFullYear() - 5);
        break;
      case "10Y":
        startDate.setFullYear(endDate.getFullYear() - 10);
        break;
    }

    // Format dates for API
    const formatDate = (date: Date) => {
      return Math.floor(date.getTime() / 1000);
    };

    const period1 = formatDate(startDate);
    const period2 = formatDate(endDate);

    // Fetch data from Yahoo Finance
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.NS?period1=${period1}&period2=${period2}&interval=1d`;
    
    const response = await fetch(yahooUrl);
    const data = await response.json();

    if (data.chart?.error) {
      throw new Error(data.chart.error.description || "Failed to fetch stock data");
    }

    const result = data.chart?.result?.[0];
    if (!result) {
      throw new Error("No data available for this ticker");
    }

    const quotes = result.indicators.quote[0];
    const timestamps = result.timestamp;
    
    // Process historical data
    const historical = timestamps.map((timestamp: number, index: number) => ({
      date: new Date(timestamp * 1000).toLocaleDateString(),
      price: quotes.close[index] || 0,
    }));

    // Calculate current price info
    const latestPrice = quotes.close[quotes.close.length - 1];
    const previousPrice = quotes.close[quotes.close.length - 2];
    const change = latestPrice - previousPrice;
    const changePercent = (change / previousPrice) * 100;

    // Calculate technical indicators
    const prices = quotes.close.filter((p: number) => p !== null);
    const ma20 = calculateMA(prices, 20);
    const ma50 = calculateMA(prices, 50);
    const ema = calculateEMA(prices, 12);
    const rsi = calculateRSI(prices, 14);

    // Determine signal
    let signal: "BUY" | "SELL" | "HOLD" = "HOLD";
    if (rsi < 30 && latestPrice < ma20) signal = "BUY";
    else if (rsi > 70 && latestPrice > ma20) signal = "SELL";

    // Generate forecast (simple trend-based prediction)
    const forecast = generateForecast(prices, 30);

    const responseData = {
      ticker: ticker,
      name: result.meta.longName || ticker,
      currentPrice: latestPrice,
      change: change,
      changePercent: changePercent,
      high: Math.max(...prices.slice(-20)),
      low: Math.min(...prices.slice(-20)),
      volume: quotes.volume[quotes.volume.length - 1],
      historical: historical.slice(-100), // Last 100 days for performance
      forecast: {
        predictions: forecast,
        accuracy: {
          mae: calculateMAE(prices),
          rmse: calculateRMSE(prices),
        },
      },
      indicators: {
        ma20,
        ma50,
        ema,
        rsi,
        signal,
      },
    };

    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Helper functions for technical indicators
function calculateMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1];
  const slice = prices.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

function calculateEMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1];
  const k = 2 / (period + 1);
  let ema = prices[0];
  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }
  return ema;
}

function calculateRSI(prices: number[], period: number): number {
  if (prices.length < period + 1) return 50;
  
  let gains = 0;
  let losses = 0;
  
  for (let i = prices.length - period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  const avgGain = gains / period;
  const avgLoss = losses / period;
  
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

function generateForecast(prices: number[], days: number) {
  const lastPrice = prices[prices.length - 1];
  const avgChange = (prices[prices.length - 1] - prices[prices.length - 30]) / 30;
  
  const predictions = [];
  const today = new Date();
  
  for (let i = 1; i <= days; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);
    
    const predicted = lastPrice + (avgChange * i);
    const volatility = lastPrice * 0.05; // 5% volatility
    
    predictions.push({
      date: futureDate.toLocaleDateString(),
      predicted: predicted,
      upper: predicted + volatility,
      lower: predicted - volatility,
    });
  }
  
  return predictions;
}

function calculateMAE(prices: number[]): number {
  if (prices.length < 2) return 0;
  const ma = calculateMA(prices, 20);
  const errors = prices.slice(-20).map(p => Math.abs(p - ma));
  return errors.reduce((a, b) => a + b, 0) / errors.length;
}

function calculateRMSE(prices: number[]): number {
  if (prices.length < 2) return 0;
  const ma = calculateMA(prices, 20);
  const squaredErrors = prices.slice(-20).map(p => Math.pow(p - ma, 2));
  return Math.sqrt(squaredErrors.reduce((a, b) => a + b, 0) / squaredErrors.length);
}
