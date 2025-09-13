import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Droplets, 
  Weight, 
  Brain, 
  TrendingUp,
  Calendar,
  Target,
  Smile,
  Frown,
  Meh,
  Plus
} from "lucide-react";
import { HealthMetricsChart } from "./HealthMetricsChart";
import { MoodTracker } from "./MoodTracker";
import { WellnessRecommendations } from "./WellnessRecommendations";

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock data - in real app this would come from backend
  const healthMetrics = {
    heartRate: { value: 72, status: "good", unit: "bpm" },
    bloodPressure: { value: "120/80", status: "excellent", unit: "mmHg" },
    bodyFat: { value: 18.5, status: "good", unit: "%" },
    weight: { value: 68.5, status: "good", unit: "kg" },
    steps: { value: 8420, status: "good", unit: "steps" },
    sleep: { value: 7.2, status: "excellent", unit: "hours" }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "health-excellent";
      case "good": return "health-good";
      case "warning": return "health-warning";
      case "danger": return "health-danger";
      default: return "muted";
    }
  };

  const getStatusIcon = (metric: string) => {
    switch (metric) {
      case "heartRate": return <Heart className="h-5 w-5" />;
      case "bloodPressure": return <Activity className="h-5 w-5" />;
      case "bodyFat": return <Droplets className="h-5 w-5" />;
      case "weight": return <Weight className="h-5 w-5" />;
      case "steps": return <Activity className="h-5 w-5" />;
      case "sleep": return <Brain className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-health bg-clip-text text-transparent">
              Health Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your physical and mental wellness journey
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {selectedPeriod === "week" ? "This Week" : selectedPeriod === "month" ? "This Month" : "This Year"}
            </Button>
            <Button size="sm" className="bg-gradient-health">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="physical">Physical Health</TabsTrigger>
            <TabsTrigger value="mental">Mental Health</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Health Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(healthMetrics).map(([key, metric]) => (
                <Card key={key} className="shadow-soft hover:shadow-health transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </CardTitle>
                    <div className={`text-${getStatusColor(metric.status)}`}>
                      {getStatusIcon(key)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {metric.value} <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 bg-${getStatusColor(metric.status)}/10 text-${getStatusColor(metric.status)}`}
                    >
                      {metric.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MoodTracker />
              <WellnessRecommendations />
            </div>
          </TabsContent>

          <TabsContent value="physical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthMetricsChart 
                title="Heart Rate Trend" 
                data={[
                  { time: "Mon", value: 72 },
                  { time: "Tue", value: 75 },
                  { time: "Wed", value: 68 },
                  { time: "Thu", value: 71 },
                  { time: "Fri", value: 73 },
                  { time: "Sat", value: 69 },
                  { time: "Sun", value: 72 }
                ]}
                color="hsl(var(--primary))"
              />
              <HealthMetricsChart 
                title="Weight Progress" 
                data={[
                  { time: "Week 1", value: 70.2 },
                  { time: "Week 2", value: 69.8 },
                  { time: "Week 3", value: 69.1 },
                  { time: "Week 4", value: 68.5 }
                ]}
                color="hsl(var(--secondary))"
              />
            </div>
          </TabsContent>

          <TabsContent value="mental" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Mood Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weekly Average</span>
                    <div className="flex items-center gap-2">
                      <Smile className="h-4 w-4 text-health-good" />
                      <span className="font-medium">Good</span>
                    </div>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <Smile className="h-6 w-6 text-health-excellent mx-auto mb-1" />
                      <div className="text-sm font-medium">5 days</div>
                      <div className="text-xs text-muted-foreground">Great</div>
                    </div>
                    <div className="text-center">
                      <Meh className="h-6 w-6 text-health-good mx-auto mb-1" />
                      <div className="text-sm font-medium">2 days</div>
                      <div className="text-xs text-muted-foreground">Okay</div>
                    </div>
                    <div className="text-center">
                      <Frown className="h-6 w-6 text-health-warning mx-auto mb-1" />
                      <div className="text-sm font-medium">0 days</div>
                      <div className="text-xs text-muted-foreground">Low</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    Wellness Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Daily Meditation</span>
                      <span>12/15 min</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Sleep Quality</span>
                      <span>7.2/8 hrs</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Stress Management</span>
                      <span>4/5 sessions</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <HealthMetricsChart 
                title="Overall Health Trend" 
                data={[
                  { time: "Jan", value: 75 },
                  { time: "Feb", value: 78 },
                  { time: "Mar", value: 82 },
                  { time: "Apr", value: 79 },
                  { time: "May", value: 85 },
                  { time: "Jun", value: 88 }
                ]}
                color="hsl(var(--accent))"
                height={400}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};