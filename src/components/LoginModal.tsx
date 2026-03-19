"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Lock, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal() {
  const { user, login, logout, isLoading } = useAuth();
  const [plotId, setPlotId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in from localStorage on mount
  // In a real app, this would be in a useEffect, but for simplicity we'll check on render
  // const checkAuth = () => {
  //   const savedUser = localStorage.getItem('land_user');
  //   if (savedUser) {
  //     const user = JSON.parse(savedUser);
  //     if (user.isLoggedIn) setIsAuthenticated(true);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (plotId.trim() === '') {
      setError('Please enter your Plot ID');
      return;
    }
    
    const isValid = login(plotId);
    if (isValid) {
      setIsAuthenticated(true);
      // In a real app, you might redirect or update state here
    } else {
      setError('Invalid Plot ID. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setPlotId('');
  };

  // For demo purposes, check if user is already logged in
  // In a real app, this would be done in useEffect
  // We'll simulate by checking if user has an ID
  const isLoggedIn = user.isLoggedIn && user.id !== '';

  return (
    <>
      {/* Authenticated View */}
      {isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card/20 backdrop-blur-lg rounded-[2.5rem] border border-white/20 p-8 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-primary">Access Granted</h2>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <X className="size-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="size-6 text-primary" />
                <div>
                  <p className="font-medium">Welcome back, {user.name}!</p>
                  <p className="text-sm text-muted-foreground">
                    Plot ID: {user.plotId}
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground">
                  Your private land data and CCTV feeds are now accessible.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Login Modal */}
      {!isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AnimatePresence>
            {isAuthenticated ? (
              <motion.div
                key="authenticated"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative bg-card/20 backdrop-blur-lg rounded-[2.5rem] border border-white/20 p-8 max-w-md w-full mx-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-bold text-primary">Verifying Access...</h2>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="relative h-8 w-8">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-8 w-8 bg-primary"></span>
                    </div>
                    <p className="font-medium">Unlocking your land data...</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we verify your Plot ID: <span className="font-mono">{plotId}</span>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="login-form"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative bg-card/20 backdrop-blur-lg rounded-[2.5rem] border border-white/20 p-8 max-w-md w-full mx-4"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-primary">Access Your Private View</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)}>
                    <X className="size-4" />
                  </Button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="plotId" className="mb-2 block text-sm font-medium text-muted-foreground">
                      Enter your Plot ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="plotId"
                        value={plotId}
                        onChange={(e) => setPlotId(e.target.value)}
                        placeholder="e.g., TN-CUD-001"
                        className={`block w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-transparent transition-all duration-200 ${
                          error ? 'border-destructive/50' : ''
                        }`}
                        disabled={isLoading}
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        </div>
                      )}
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-destructive">{error}</p>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      variant="default" 
                      className="w-full py-3"
                      disabled={isLoading || !plotId.trim()}
                    >
                      {isLoading ? 'Verifying...' : 'Access Private View'}
                    </Button>
                  </div>
                  
                  <div className="text-center text-xs text-muted-foreground">
                    Demo Plot IDs: TN-CUD-001, TN-CHE-002, TN-MDU-003, LAND2026, UK-INVEST-01, CUDDALORE-PLOT
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}