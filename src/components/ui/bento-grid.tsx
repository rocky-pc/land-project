import { cn } from "@/lib/utils";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-[2rem] group/bento hover:shadow-2xl transition duration-500 shadow-sm glass p-6 flex flex-col justify-between space-y-4",
        className
      )}
    >
      <div className="flex-1 overflow-hidden rounded-xl">
        {header}
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200 mt-auto">
        {icon}
        <div className="font-serif font-bold text-foreground mb-2 mt-2 text-xl">
          {title}
        </div>
        <div className="font-sans font-normal text-muted-foreground text-sm">
          {description}
        </div>
      </div>
    </div>
  );
};
