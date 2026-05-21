import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'primary' | 'dark';
  containerClassName?: string;
}

export default function Section({ 
  children, 
  className, 
  variant = 'default',
  containerClassName,
  ...props
}: SectionProps) {
  const variantClasses = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    primary: 'bg-primary text-primary-foreground',
    dark: 'bg-slate-50 text-slate-900 border-y border-slate-100',
  };

  return (
    <section 
      className={cn("py-16 md:py-24 overflow-hidden", variantClasses[variant], className)}
      {...props}
    >
      <div className={cn("container mx-auto px-4 md:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) {
  return (
    <div className={cn("mb-12 md:mb-16 max-w-3xl", centered && "mx-auto text-center")}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
}
