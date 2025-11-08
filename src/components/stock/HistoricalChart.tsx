import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";

interface HistoricalChartProps {
  data: Array<{ date: string; price: number }>;
  ticker: string;
  timeframe: "1Y" | "5Y" | "10Y";
  onTimeframeChange: (timeframe: "1Y" | "5Y" | "10Y") => void;
}

const HistoricalChart = ({ data, ticker, timeframe, onTimeframeChange }: HistoricalChartProps) => {
  return (
    <Card className="bg-gradient-to-br from-card to-card/80 border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-foreground">Historical Price Chart</CardTitle>
            <CardDescription className="text-muted-foreground">
              {ticker} price trends over time
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeframe === "1Y" ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeframeChange("1Y")}
              className={timeframe === "1Y" ? "bg-accent text-accent-foreground" : ""}
            >
              1Y
            </Button>
            <Button
              variant={timeframe === "5Y" ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeframeChange("5Y")}
              className={timeframe === "5Y" ? "bg-accent text-accent-foreground" : ""}
            >
              5Y
            </Button>
            <Button
              variant={timeframe === "10Y" ? "default" : "outline"}
              size="sm"
              onClick={() => onTimeframeChange("10Y")}
              className={timeframe === "10Y" ? "bg-accent text-accent-foreground" : ""}
            >
              10Y
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HistoricalChart;
