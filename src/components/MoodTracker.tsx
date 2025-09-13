import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Smile, Meh, Frown, Heart, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moodOptions = [
  { icon: Smile, label: "Great", value: 5, color: "health-excellent" },
  { icon: Smile, label: "Good", value: 4, color: "health-good" },
  { icon: Meh, label: "Okay", value: 3, color: "health-warning" },
  { icon: Frown, label: "Low", value: 2, color: "health-danger" },
  { icon: Frown, label: "Poor", value: 1, color: "health-danger" }
];

const recentMoods = [
  { date: "Today", mood: "Good", value: 4, note: "Had a productive day at work" },
  { date: "Yesterday", mood: "Great", value: 5, note: "Amazing workout session" },
  { date: "2 days ago", mood: "Okay", value: 3, note: "Felt a bit stressed" }
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleMoodSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mood recorded!",
      description: "Your daily check-in has been saved",
    });

    setSelectedMood(null);
    setNote("");
  };

  return (
    <Card className="shadow-soft hover:shadow-health transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Daily Mood Check-in
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">How are you feeling today?</h4>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map((mood) => {
              const Icon = mood.icon;
              return (
                <Button
                  key={mood.value}
                  variant={selectedMood === mood.value ? "default" : "outline"}
                  size="sm"
                  className={`h-16 flex-col gap-1 ${
                    selectedMood === mood.value 
                      ? `bg-${mood.color} hover:bg-${mood.color}/90` 
                      : `hover:bg-${mood.color}/10 hover:border-${mood.color}`
                  }`}
                  onClick={() => setSelectedMood(mood.value)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{mood.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Note Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            How was your day? (Optional)
          </label>
          <Textarea
            placeholder="Share what made your day special or challenging..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleMoodSubmit}
          className="w-full bg-gradient-mood"
          disabled={selectedMood === null}
        >
          <Zap className="h-4 w-4 mr-2" />
          Record Mood
        </Button>

        {/* Recent Moods */}
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-sm font-medium text-muted-foreground">Recent Check-ins</h4>
          <div className="space-y-2">
            {recentMoods.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">
                    {entry.date}
                  </Badge>
                  <span className="text-sm font-medium">{entry.mood}</span>
                </div>
                <div className="text-xs text-muted-foreground max-w-32 truncate">
                  {entry.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};