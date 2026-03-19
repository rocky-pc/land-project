"use client"; // Required for Next.js App Router hooks

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  DollarSign, 
  PoundSterling, 
  IndianRupee, 
  ArrowLeftRight 
} from "lucide-react";

export function Navbar() {
  const [currency, setCurrency] = useState('INR');
  const [units, setUnits] = useState('Sq.Ft');

  const currencies = [
    { code: 'INR', symbol: '₹', icon: IndianRupee },
    { code: 'GBP', symbol: '£', icon: PoundSterling },
    { code: 'USD', symbol: '$', icon: DollarSign }
  ];

  const unitOptions = [
    { label: 'Sq.Ft', value: 'Sq.Ft' },
    { label: 'Cents', value: 'Cents' },
    { label: 'Acres', value: 'Acres' }
  ];

  // Get the current icon component
  const SelectedCurrencyIcon = currencies.find(c => c.code === currency)?.icon;

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b-0 border-transparent bg-background/40 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors duration-300">
      <div className="font-serif text-2xl font-bold tracking-tight text-primary">
        <Link href="/">உங்கள் நிலம் உங்கள் கையில்</Link>
      </div>
      
      <div className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <Link href="/cctv" className="hover:text-primary transition-colors">Live CCTV</Link>
        <Link href="/analytics" className="hover:text-primary transition-colors">Plot Analytics</Link>
        <Link href="/portal" className="hover:text-primary transition-colors">Investor Portal</Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Currency Toggle */}
        <div className="relative group"> {/* Added group for hover display testing */}
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            {SelectedCurrencyIcon && <SelectedCurrencyIcon className="size-4" />}
            <span className="ml-1">{currencies.find(c => c.code === currency)?.symbol}</span>
            <svg className="ml-2 size-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </Button>
          
          {/* Dropdown menu - Note: change 'hidden' to logic or CSS hover to see it */}
          <div className="absolute right-0 mt-2 w-32 bg-card/80 backdrop-blur-lg rounded-lg border border-white/20 p-2 z-50 hidden group-hover:block">
            {currencies.map((c) => {
              const Icon = c.icon;
              return (
                <Button
                  key={c.code}
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${currency === c.code ? 'bg-accent' : ''}`}
                  onClick={() => setCurrency(c.code)}
                >
                  <Icon className="size-4 mr-2" />
                  <span>{c.symbol}</span>
                  <span className="ml-auto text-[10px] opacity-50">{c.code}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Units Toggle */}
        <div className="relative group">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeftRight className="size-4" />
            <span className="ml-1">{units}</span>
            <svg className="ml-2 size-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </Button>
          <div className="absolute right-0 mt-2 w-32 bg-card/80 backdrop-blur-lg rounded-lg border border-white/20 p-2 z-50 hidden group-hover:block">
            {unitOptions.map(u => (
              <Button
                key={u.value}
                variant="ghost"
                size="sm"
                className={`w-full justify-start ${units === u.value ? 'bg-accent' : ''}`}
                onClick={() => setUnits(u.value)}
              >
                {u.label}
              </Button>
            ))}
          </div>
        </div>

        <Link href="/contact">
          <Button variant="default" className="rounded-full">Contact Concierge</Button>
        </Link>
      </div>
    </nav>
  );
}