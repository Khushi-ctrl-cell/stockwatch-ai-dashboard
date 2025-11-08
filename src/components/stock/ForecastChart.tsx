import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface ForecastChartProps {
  forecast: {
    predictions: Array<{ date: string; predicted: number; lower: number; upper: number }>;
    accuracy: { mae: number; rmse: number };
  };
  ticker: string;
}

const ForecastChart = ({ forecast, ticker }: ForecastChartProps) => {
  return (
    <div className="space-y-4">
      {/* Accuracy Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Forecast Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">30 Days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Mean Absolute Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{forecast.accuracy.mae.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Root Mean Squared Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{forecast.accuracy.rmse.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Price Forecast - Next 30 Days
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            AI-powered predictions for {ticker} with confidence intervals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={forecast.predictions}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="upper"
                stroke="hsl(var(--chart-3))"
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Upper Bound"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                name="Predicted Price"
              />
              <Line
                type="monotone"
                dataKey="lower"
                stroke="hsl(var(--chart-4))"
                strokeWidth={1}
                strokeDasharray="5 5"
                name="Lower Bound"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForecastChart;
