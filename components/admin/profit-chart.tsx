"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProfitChart({
  data
}: {
  data: Array<{ label: string; income: number; expenses: number; profit: number }>;
}) {
  return (
    <div className="h-80 rounded-lg border bg-white p-4" id="analytics">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#0f766e" name="Income" />
          <Bar dataKey="expenses" fill="#ca8a04" name="Expenses" />
          <Bar dataKey="profit" fill="#075985" name="Profit" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
