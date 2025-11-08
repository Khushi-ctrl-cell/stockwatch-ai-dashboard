import { useState } from "react";
import StockSearch from "@/components/stock/StockSearch";
import PopularStocks from "@/components/stock/PopularStocks";
import StockDashboard from "@/components/stock/StockDashboard";
import { TrendingUp } from "lucide-react";

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">StockForecast Pro</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Market Analytics</p>
              </div>
            </div>
          </div>
          <StockSearch onStockSelect={setSelectedStock} />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {selectedStock ? (
          <StockDashboard ticker={selectedStock} />
        ) : (
          <PopularStocks onStockSelect={setSelectedStock} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Stock data powered by market APIs • Predictions are estimates and not financial advice</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
