import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, BarChart3, Brain, Shield, Zap, LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Real-Time Market Data",
      description: "Access live stock prices and instant market updates from Indian exchanges",
    },
    {
      icon: <Brain className="h-8 w-8 text-accent" />,
      title: "AI-Powered Forecasting",
      description: "Advanced machine learning predictions for future price movements",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Technical Indicators",
      description: "RSI, Moving Averages, EMA, and comprehensive technical analysis",
    },
    {
      icon: <LineChart className="h-8 w-8 text-accent" />,
      title: "Historical Charts",
      description: "Analyze trends over 1, 5, or 10 years with interactive visualizations",
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Trading Signals",
      description: "Get BUY, SELL, or HOLD signals based on algorithmic analysis",
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Confidence Intervals",
      description: "Understand prediction reliability with upper and lower bounds",
    },
  ];

  const popularStocks = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI-Powered Analytics</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Predict Stock Prices with{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                AI Precision
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Advanced forecasting platform combining real-time data, technical indicators, 
              and machine learning to help you make informed trading decisions
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate("/dashboard")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Start Analyzing Stocks
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/50 text-foreground hover:bg-accent/10 text-lg px-8 py-6"
                onClick={() => navigate("/dashboard")}
              >
                View Popular Stocks
              </Button>
            </div>

            {/* Popular Stocks Ticker */}
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">Popular stocks to analyze:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularStocks.map((stock) => (
                  <div 
                    key={stock}
                    className="px-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm font-medium text-foreground hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => navigate("/dashboard")}
                  >
                    {stock}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Powerful Features for Smart Trading
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to analyze stocks and make data-driven investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-card to-card/80 border-border hover:border-accent/50 transition-all hover:shadow-lg group"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="p-3 bg-accent/10 rounded-lg w-fit group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-accent">12+</p>
              <p className="text-muted-foreground">Popular Indian Stocks</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-accent">30 Days</p>
              <p className="text-muted-foreground">Price Forecasting</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-5xl font-bold text-accent">Real-Time</p>
              <p className="text-muted-foreground">Market Data</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 max-w-4xl mx-auto">
            <CardContent className="py-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Make Smarter Investments?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of traders using AI-powered analytics to stay ahead of the market
              </p>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 shadow-lg"
                onClick={() => navigate("/dashboard")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>Stock data powered by market APIs • Predictions are estimates and not financial advice</p>
          <p className="mt-2">© 2025 StockForecast Pro. Built with AI technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
