import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Target, Clock, BookOpen, Brain } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

const AnalyticsPanel = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 2.8 },
  ];

  const topicMastery = [
    { name: 'Strong', value: 45, color: 'hsl(142 76% 45%)' },
    { name: 'Moderate', value: 35, color: 'hsl(38 92% 50%)' },
    { name: 'Weak', value: 20, color: 'hsl(0 84% 60%)' },
  ];

  const progressData = [
    { week: 'W1', score: 45 },
    { week: 'W2', score: 52 },
    { week: 'W3', score: 58 },
    { week: 'W4', score: 72 },
    { week: 'W5', score: 78 },
    { week: 'W6', score: 85 },
  ];

  const stats = [
    { icon: Clock, label: 'Study Time', value: '18h', change: '+2.5h', up: true },
    { icon: BookOpen, label: 'Documents', value: '12', change: '+3', up: true },
    { icon: Brain, label: 'Cards Mastered', value: '156', change: '+28', up: true },
    { icon: Target, label: 'Quiz Accuracy', value: '82%', change: '+5%', up: true },
  ];

  const weakTopics = [
    { topic: 'Statistical Analysis', score: 45 },
    { topic: 'Research Methods', score: 52 },
    { topic: 'Data Interpretation', score: 58 },
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="panel p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-xl font-bold text-foreground">{stat.value}</span>
              <span className={cn(
                "text-xs font-medium flex items-center gap-0.5",
                stat.up ? "text-success" : "text-destructive"
              )}>
                {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Study Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="panel p-4"
      >
        <h4 className="text-sm font-semibold text-foreground mb-4">Weekly Study Time</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(215 20% 55%)' }}
              />
              <YAxis hide />
              <Bar 
                dataKey="hours" 
                fill="hsl(174 72% 56%)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Topic Mastery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="panel p-4"
      >
        <h4 className="text-sm font-semibold text-foreground mb-4">Topic Mastery</h4>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicMastery}
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {topicMastery.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {topicMastery.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground flex-1">{item.name}</span>
                <span className="text-xs font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Progress Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="panel p-4"
      >
        <h4 className="text-sm font-semibold text-foreground mb-4">Progress Trend</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
              <XAxis 
                dataKey="week" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: 'hsl(215 20% 55%)' }}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222 47% 10%)',
                  border: '1px solid hsl(222 30% 18%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(174 72% 56%)" 
                strokeWidth={2}
                dot={{ fill: 'hsl(174 72% 56%)', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Weak Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="panel p-4"
      >
        <h4 className="text-sm font-semibold text-foreground mb-4">Focus Areas</h4>
        <div className="space-y-3">
          {weakTopics.map((topic, i) => (
            <div key={topic.topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{topic.topic}</span>
                <span className="text-xs font-medium text-warning">{topic.score}%</span>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.score}%` }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  className="h-full bg-warning"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPanel;
