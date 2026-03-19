"use client";

import { FileText, ShieldCheck, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalPage() {
  const documents = [
    { name: "Title Deed (Patta & Chitta)", status: "Verified", date: "Oct 2025", size: "2.4 MB" },
    { name: "EC (Encumbrance Certificate) - 30 Years", status: "Verified", date: "Nov 2025", size: "4.1 MB" },
    { name: "FMB Sketch & Topo Plan", status: "Verified", date: "Jan 2026", size: "1.8 MB" },
    { name: "Legal Opinion Report", status: "Verified", date: "Feb 2026", size: "3.5 MB" },
  ];

  return (
    <main className="flex-1 w-full bg-background px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <Lock className="size-8" />
          </div>
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Investor Portal</h1>
            <p className="text-muted-foreground text-lg mt-2">Secure vault for all your verified legal documents.</p>
          </div>
        </div>

        <div className="glass-lg rounded-[2rem] overflow-hidden">
          <div className="p-6 md:p-8 bg-muted/30 border-b border-border/50">
            <h2 className="font-serif text-2xl font-bold">Legal Documents Vault</h2>
            <p className="text-sm text-muted-foreground mt-1">Ready for NRI & Foreign Investor due diligence.</p>
          </div>
          
          <div className="divide-y divide-border/50">
            {documents.map((doc, idx) => (
              <div key={idx} className="p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-muted/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-background rounded-xl border border-border mt-1">
                    <FileText className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span className="flex items-center text-green-600 font-medium">
                        <ShieldCheck className="size-4 mr-1" />
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="rounded-full w-full sm:w-auto shrink-0">
                  <Download className="mr-2 size-4" /> Download PDF
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
