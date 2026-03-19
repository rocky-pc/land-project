"use client";

import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main className="flex-1 w-full bg-background px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">Concierge Contact</h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Schedule a personalized site visit or request a live 4K drone tour of your selected plots. Our concierges speak English, Tamil, and Hindi.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="p-3 bg-muted rounded-full h-fit text-primary">
                  <MapPin className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Corporate Office</h3>
                  <p className="text-muted-foreground mt-1">Level 4, Prestige Tower<br/>Anna Salai, Chennai 600002</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="p-3 bg-muted rounded-full h-fit text-primary">
                  <Phone className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Global Hotline</h3>
                  <p className="text-muted-foreground mt-1">+44 20 7123 4567 (UK)<br/>+1 212 555 0198 (US)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-muted rounded-full h-fit text-primary">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Support</h3>
                  <p className="text-muted-foreground mt-1">invest@yourland.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-lg p-8 md:p-10 rounded-[2rem]">
            <h3 className="font-serif text-2xl font-bold mb-6">Request a Drone Tour</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input type="text" className="w-full h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" className="w-full h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" className="w-full h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" placeholder="+44 ..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Time (IST)</label>
                <select className="w-full h-12 rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                  <option>Morning (10 AM - 12 PM)</option>
                  <option>Afternoon (1 PM - 4 PM)</option>
                  <option>Evening (4 PM - 6 PM)</option>
                </select>
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full h-14 text-lg">
                <Send className="mr-2 size-5" /> Submit Request
              </Button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
