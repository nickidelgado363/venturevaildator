import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  let color = '#ef4444'; // Red
  if (score >= 50) color = '#eab308'; // Yellow
  if (score >= 75) color = '#22c55e'; // Green
  if (score >= 90) color = '#3b82f6'; // Blue (Unicorn)

  const emptyColor = '#1e293b';

  return (
    <div className="relative h-48 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell key="score" fill={color} />
            <Cell key="remaining" fill={emptyColor} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute top-[55%] left-0 right-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-xs uppercase tracking-wider text-slate-400 mt-1">Viability Score</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
