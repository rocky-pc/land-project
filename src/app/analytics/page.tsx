"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { TreePine, MapPin, FileCheck, Thermometer, Droplets, Ruler } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <main className="flex-1 w-full bg-background px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Plot Analytics</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Comprehensive data on your plot. Soil health, geographic distance, and survey records updated in real-time.
          </p>
        </div>

        <BentoGrid>
          <BentoGridItem
            title="Soil Health"
            description="Optimal pH levels (6.5-7.5) suitable for all luxury landscaping and organic farming efforts."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Thermometer className="size-16 text-primary opacity-50" /></div>}
            icon={<TreePine className="h-5 w-5 text-primary" />}
            className="md:col-span-2"
          />
          <BentoGridItem
            title="Water Table"
            description="Abundant sweet water at 120ft depth. Rainwater harvesting system integrated."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Droplets className="size-16 text-blue-500 opacity-50" /></div>}
            icon={<Droplets className="h-5 w-5 text-blue-500" />}
            className="md:col-span-1"
          />
          <BentoGridItem
            title="Strategic Location"
            description="25 mins from International Airport. 10 mins from the upcoming Metro Hub."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><MapPin className="size-16 text-primary opacity-50" /></div>}
            icon={<MapPin className="h-5 w-5 text-primary" />}
            className="md:col-span-1"
          />
          <BentoGridItem
            title="Government Survey Data"
            description="Plot exactly matches FMBC records. Dimensions: 60ft x 40ft (2400 sq.ft)."
            header={<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Ruler className="size-16 text-primary opacity-50" /></div>}
            icon={<FileCheck className="h-5 w-5 text-primary" />}
            className="md:col-span-2"
          />
        </BentoGrid>
      </div>
    </main>
  );
}
