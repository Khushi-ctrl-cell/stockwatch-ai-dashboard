import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface StockPriceCardProps {
  stockData: {
    ticker: string;
    name: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
  };
}

const StockPriceCard = ({ stockData }: StockPriceCardProps) => {
  const isPositive = stockData.change >= 0;

  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground flex items-center justify-between">
          <div>
            <span className="font-bold">{stockData.ticker}</span>
            <span className="text-muted-foreground text-base ml-3">{stockData.name}</span>
          </div>
          {isPositive ? (
            <TrendingUp className="h-8 w-8 text-success" />
          ) : (
            <TrendingDown className="h-8 w-8 text-destructive" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Current Price */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-3xl font-bold text-foreground flex items-center gap-1">
              <DollarSign className="h-6 w-6" />
              {stockData.currentPrice.toFixed(2)}
            </p>
            <p className={`text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
              {isPositive ? "+" : ""}{stockData.change.toFixed(2)} ({isPositive ? "+" : ""}
              {stockData.changePercent.toFixed(2)}%)
            </p>
          </div>

          {/* Day High */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Day High</p>
            <p className="text-2xl font-semibold text-foreground">
              ${stockData.high.toFixed(2)}
            </p>
          </div>

          {/* Day Low */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Day Low</p>
            <p className="text-2xl font-semibold text-foreground">
              ${stockData.low.toFixed(2)}
            </p>
          </div>

          {/* Volume */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Volume</p>
            <p className="text-2xl font-semibold text-foreground">
              {(stockData.volume / 1000000).toFixed(2)}M
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockPriceCard;
