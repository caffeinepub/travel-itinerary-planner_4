import { useNavigate } from '@tanstack/react-router';
import { Plus, Compass, Map, CalendarDays, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ItineraryCard from '../components/ItineraryCard';
import CountryPlanningSection from '../components/CountryPlanningSection';
import ProposalSection from '../components/ProposalSection';
import { useGetAllItineraries } from '../hooks/useQueries';

const features = [
  {
    icon: <Map className="w-6 h-6 text-primary" />,
    title: 'Plan Day by Day',
    description: 'Organize your trip with a detailed day-by-day timeline of activities.',
  },
  {
    icon: <CalendarDays className="w-6 h-6 text-primary" />,
    title: 'Track Dates & Times',
    description: 'Keep all your travel dates, times, and schedules in one place.',
  },
  {
    icon: <Compass className="w-6 h-6 text-primary" />,
    title: 'Discover & Explore',
    description: 'Add locations, notes, and details for every stop on your journey.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { data: itineraries, isLoading, isError } = useGetAllItineraries();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1440x600.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-background" />
        <div className="relative container mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-sand-100" />
              <span className="text-sand-100 text-sm font-medium font-body tracking-wide uppercase">
                Your travel companion
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-sand-50 leading-tight mb-5">
              Plan Your Perfect
              <span className="block text-terracotta-300">Adventure</span>
            </h1>
            <p className="text-sand-200 text-lg md:text-xl font-body mb-8 leading-relaxed max-w-xl">
              Create beautiful travel itineraries, organize your days, and keep all your trip details in one place.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/itinerary/new', search: {} })}
                className="gap-2 text-base px-6 shadow-warm"
              >
                <Plus className="w-5 h-5" />
                Start Planning
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById('my-trips')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="gap-2 text-base px-6 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                View My Trips
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Country Planning Section */}
      <CountryPlanningSection />

      {/* Proposal Section */}
      <ProposalSection />

      {/* Features Section */}
      <section className="bg-sand-200 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Everything you need to travel smarter
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              From the first idea to the last activity, Wanderplan keeps your journey organized.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border shadow-card text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itineraries Section */}
      <section id="my-trips" className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-1">
                My Trips
              </h2>
              <p className="text-muted-foreground font-body text-sm">
                {itineraries && itineraries.length > 0
                  ? `${itineraries.length} trip${itineraries.length !== 1 ? 's' : ''} planned`
                  : 'No trips yet — start planning!'}
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: '/itinerary/new', search: {} })}
              className="gap-1.5 hidden sm:flex"
            >
              <Plus className="w-4 h-4" />
              New Trip
            </Button>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border">
                  <Skeleton className="h-2 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-body mb-4">
                Failed to load trips. Please try again.
              </p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          )}

          {!isLoading && !isError && itineraries && itineraries.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl bg-muted/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No trips yet
              </h3>
              <p className="text-muted-foreground font-body text-sm mb-6 max-w-sm mx-auto">
                Start by creating your first itinerary or generate a sample one above.
              </p>
              <Button
                onClick={() => navigate({ to: '/itinerary/new', search: {} })}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Your First Trip
              </Button>
            </div>
          )}

          {!isLoading && !isError && itineraries && itineraries.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {itineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id.toString()} itinerary={itinerary} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
