"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, CircleDot } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  description,
  isLoading = false,
  trend = "neutral",
  prefix = "",
  suffix = "",
  formatter = (value) => value.toString(),
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Simple animation for the numbers
    const duration = 1000; // 1 second
    const steps = 20;
    const stepDuration = duration / steps;
    const increment = (value - displayValue) / steps;

    if (value !== displayValue) {
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;

        if (currentStep >= steps) {
          setDisplayValue(value);
          clearInterval(interval);
        } else {
          setDisplayValue((prev) => Math.round(prev + increment));
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [value, displayValue]);

  const trendIcon = {
    positive: <ArrowUpCircle className="h-4 w-4 text-emerald-500" />,
    negative: <ArrowDownCircle className="h-4 w-4 text-rose-500" />,
    neutral: <CircleDot className="h-4 w-4 text-muted-foreground" />,
  };

  const trendText = {
    positive: "text-emerald-500",
    negative: "text-rose-500",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>

          <div className="flex items-center gap-1">{trendIcon[trend]}</div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>

          {isLoading ? (
            <Skeleton className="h-8 w-3/4" />
          ) : (
            <p className="text-2xl font-bold tracking-tight">
              {prefix}
              {formatter(displayValue)}
              {suffix}
            </p>
          )}

          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
