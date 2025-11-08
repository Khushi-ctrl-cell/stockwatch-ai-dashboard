import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import StockPriceCard from "./StockPriceCard";
import HistoricalChart from "./HistoricalChart";
import ForecastChart from "./ForecastChart";
import TechnicalIndicators from "./TechnicalIndicators";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface StockDashboardProps {
  ticker: string;
}

const StockDashboard = ({ ticker }: StockDashboardProps) => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState<"1Y" | "5Y" | "10Y">("1Y");

  const { data: stockData, isLoading, error } = useQuery({
    queryKey: ["stock", ticker, timeframe],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-stock-data", {
        body: { ticker, timeframe },
      });

      if (error) throw error;
      return data;
    },
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching stock data",
        description: "Unable to load stock information. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto" />
          <p className="text-muted-foreground">Loading stock data...</p>
        </div>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-destructive text-lg">Failed to load stock data</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stock Price Overview */}
      <StockPriceCard stockData={stockData} />

      {/* Tabs for different views */}
      <Tabs defaultValue="historical" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary">
          <TabsTrigger value="historical">Historical</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
          <TabsTrigger value="indicators">Indicators</TabsTrigger>
        </TabsList>

        <TabsContent value="historical" className="space-y-4">
          <HistoricalChart 
            data={stockData.historical} 
            ticker={ticker}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <ForecastChart forecast={stockData.forecast} ticker={ticker} />
        </TabsContent>

        <TabsContent value="indicators" className="space-y-4">
          <TechnicalIndicators indicators={stockData.indicators} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDashboard;
