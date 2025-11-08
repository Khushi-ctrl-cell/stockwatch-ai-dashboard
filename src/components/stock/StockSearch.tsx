import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StockSearchProps {
  onStockSelect: (ticker: string) => void;
}

const StockSearch = ({ onStockSelect }: StockSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onStockSelect(searchQuery.toUpperCase().trim());
      setSearchQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search stocks by ticker (e.g., RELIANCE, TCS, INFY)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-secondary/50 border-border focus:ring-accent"
        />
      </div>
      <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        Search
      </Button>
    </form>
  );
};

export default StockSearch;
