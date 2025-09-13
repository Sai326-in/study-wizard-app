import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Activity, 
  Moon, 
  Apple, 
  Brain, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    type: "exercise",
    icon: Activity,
    title: "10-Minute Morning Stretch",
    description: "Start your day with gentle stretching to improve flexibility",
    priority: "high",
    category: "Physical",
    duration: "10 min",
    completed: false
  },
  {
    id: 2,
    type: "sleep",
    icon: Moon,
    title: "Consistent Sleep Schedule",
    description: "Try to sleep and wake up at the same time daily",
    priority: "medium",
    category: "Sleep",
    duration: "Ongoing",
    completed: true
  },
  {
    id: 3,
    type: "nutrition",
    icon: Apple,
    title: "Hydration Reminder",
    description: "Drink 8 glasses of water throughout the day",
    priority: "high",
    category: "Nutrition",
    duration: "All day",
    completed: false
  },
  {
    id: 4,
    type: "mental",
    icon: Brain,
    title: "5-Minute Meditation",
    description: "Practice mindfulness to reduce stress and anxiety",
    priority: "medium",
    category: "Mental",
    duration: "5 min",
    completed: false
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "health-danger";
    case "medium": return "health-warning";
    case "low": return "health-good";
    default: return "muted";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Physical": return "primary";
    case "Mental": return "accent";
    case "Sleep": return "secondary";
    case "Nutrition": return "health-good";
    default: return "muted";
  }
};

export const WellnessRecommendations = () => {
  const handleMarkComplete = (id: number) => {
    // In real app, this would update the backend
    console.log(`Marking recommendation ${id} as complete`);
  };

  const activeRecommendations = recommendations.filter(rec => !rec.completed);
  const completedCount = recommendations.filter(rec => rec.completed).length;

  return (
    <Card className="shadow-soft hover:shadow-health transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Wellness Recommendations
          </div>
          <Badge variant="secondary" className="text-xs">
            {completedCount}/{recommendations.length} completed
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeRecommendations.map((rec) => {
          const Icon = rec.icon;
          return (
            <div 
              key={rec.id} 
              className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-${getCategoryColor(rec.category)}/10`}>
                  <Icon className={`h-4 w-4 text-${getCategoryColor(rec.category)}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs border-${getPriorityColor(rec.priority)}/30 text-${getPriorityColor(rec.priority)}`}
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {rec.duration}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {rec.category}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => handleMarkComplete(rec.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {activeRecommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-health-excellent" />
            <h4 className="font-medium mb-2">All caught up!</h4>
            <p className="text-sm">You've completed all your wellness recommendations for today.</p>
          </div>
        )}

        <Button variant="outline" className="w-full" size="sm">
          View All Recommendations
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};