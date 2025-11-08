import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Building2 } from "lucide-react";

interface PopularStocksProps {
  onStockSelect: (ticker: string) => void;
}

const POPULAR_STOCKS = [
  { ticker: "RELIANCE", name: "Reliance Industries", sector: "Conglomerate", description: "Oil, Gas, Telecom, Retail" },
  { ticker: "TCS", name: "Tata Consultancy Services", sector: "IT Services", description: "Leading IT solutions provider" },
  { ticker: "INFY", name: "Infosys Limited", sector: "IT Services", description: "Global consulting and digital services" },
  { ticker: "HDFCBANK", name: "HDFC Bank", sector: "Banking", description: "India's largest private bank" },
  { ticker: "ICICIBANK", name: "ICICI Bank", sector: "Banking", description: "Major private banking institution" },
  { ticker: "SBIN", name: "State Bank of India", sector: "Banking", description: "Largest public sector bank" },
  { ticker: "LT", name: "Larsen & Toubro", sector: "Engineering", description: "Infrastructure and engineering leader" },
  { ticker: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom", description: "Leading telecom operator" },
  { ticker: "ADANIENT", name: "Adani Enterprises", sector: "Conglomerate", description: "Infrastructure and energy" },
  { ticker: "ASIANPAINT", name: "Asian Paints", sector: "Manufacturing", description: "India's largest paint company" },
  { ticker: "MARUTI", name: "Maruti Suzuki", sector: "Automotive", description: "Leading automobile manufacturer" },
  { ticker: "HINDUNILVR", name: "Hindustan Unilever", sector: "FMCG", description: "Consumer goods leader" },
];

const PopularStocks = ({ onStockSelect }: PopularStocksProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Popular Indian Stocks</h2>
        <p className="text-muted-foreground">Click on any stock to view detailed analytics and forecasts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {POPULAR_STOCKS.map((stock) => (
          <Card
            key={stock.ticker}
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 bg-gradient-to-br from-card to-card/80 border-border hover:border-accent/50"
            onClick={() => onStockSelect(stock.ticker)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-accent" />
                    {stock.ticker}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">
                    {stock.name}
                  </CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sector:</span>
                  <span className="text-foreground font-medium">{stock.sector}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stock.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PopularStocks;
