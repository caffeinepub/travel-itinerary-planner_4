import { Link, useNavigate } from '@tanstack/react-router';
import { MapPin, Menu, X, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/assets/generated/logo-mark.dim_128x128.png"
                alt="Wanderplan logo"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="font-display text-xl font-semibold text-foreground tracking-tight">
                Wander<span className="text-primary">plan</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: 'text-foreground' }}
              >
                My Trips
              </Link>
              <Button
                size="sm"
                onClick={() => navigate({ to: '/itinerary/new', search: {} })}
                className="gap-1.5"
              >
                <Plus className="w-4 h-4" />
                New Trip
              </Button>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden border-t border-border py-3 space-y-1 animate-fade-in">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <MapPin className="w-4 h-4" />
                My Trips
              </Link>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                onClick={() => {
                  setMobileOpen(false);
                  navigate({ to: '/itinerary/new', search: {} });
                }}
              >
                <Plus className="w-4 h-4" />
                New Trip
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/generated/logo-mark.dim_128x128.png"
                alt="Wanderplan"
                className="w-7 h-7 rounded object-cover opacity-80"
              />
              <span className="font-display text-base font-semibold text-foreground/70">
                Wanderplan
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Wanderplan. Built with{' '}
              <span className="text-primary">♥</span> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'wanderplan')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
