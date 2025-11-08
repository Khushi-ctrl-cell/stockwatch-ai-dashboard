import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TechnicalIndicatorsProps {
  indicators: {
    ma20: number;
    ma50: number;
    ema: number;
    rsi: number;
    signal: "BUY" | "SELL" | "HOLD";
  };
}

const TechnicalIndicators = ({ indicators }: TechnicalIndicatorsProps) => {
  const getRSIColor = (rsi: number) => {
    if (rsi < 30) return "text-success";
    if (rsi > 70) return "text-destructive";
    return "text-accent";
  };

  const getSignalColor = (signal: string) => {
    if (signal === "BUY") return "bg-success text-success-foreground";
    if (signal === "SELL") return "bg-destructive text-destructive-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      {/* Signal Card */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border">
        <CardHeader>
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent" />
            Trading Signal
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Based on technical analysis of current indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className={`px-8 py-4 rounded-lg text-2xl font-bold ${getSignalColor(indicators.signal)}`}>
              {indicators.signal}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moving Averages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              MA (20 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">${indicators.ma20.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Moving Average</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              MA (50 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">${indicators.ma50.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Moving Average</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              EMA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">${indicators.ema.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Exponential Moving Average</p>
          </CardContent>
        </Card>
      </div>

      {/* RSI Indicator */}
      <Card className="bg-gradient-to-br from-card to-card/80 border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            Relative Strength Index (RSI)
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            RSI below 30 = Oversold (Buy signal) | RSI above 70 = Overbought (Sell signal)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current RSI</span>
            <span className={`text-3xl font-bold ${getRSIColor(indicators.rsi)}`}>
              {indicators.rsi.toFixed(2)}
            </span>
          </div>
          <Progress value={indicators.rsi} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Oversold (0)</span>
            <span>Neutral (50)</span>
            <span>Overbought (100)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalIndicators;
