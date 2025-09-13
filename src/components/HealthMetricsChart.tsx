import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface HealthMetricsChartProps {
  title: string;
  data: Array<{ time: string; value: number }>;
  color: string;
  height?: number;
}

export const HealthMetricsChart = ({ title, data, color, height = 300 }: HealthMetricsChartProps) => {
  const trend = data.length > 1 ? 
    ((data[data.length - 1].value - data[0].value) / data[0].value) * 100 : 0;

  return (
    <Card className="shadow-soft hover:shadow-health transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? 'text-health-good' : 'text-health-warning'}`}>
          <TrendingUp className="h-4 w-4" />
          {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-soft)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};