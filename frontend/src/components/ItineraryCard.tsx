import { Link } from '@tanstack/react-router';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Itinerary } from '../backend';
import { formatDate, getDayCount } from '../hooks/useQueries';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const dayCount = getDayCount(itinerary.startDate, itinerary.endDate);

  return (
    <Link to="/itinerary/$id" params={{ id: itinerary.id.toString() }}>
      <Card className="group overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 shadow-card hover:shadow-card-hover cursor-pointer bg-card">
        <div className="h-2 bg-gradient-to-r from-terracotta-400 to-terracotta-600" />
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-display text-lg font-semibold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {itinerary.tripName}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs font-body">
              {dayCount} {dayCount === 1 ? 'day' : 'days'}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate font-body">{itinerary.destination}</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-body">
              {formatDate(itinerary.startDate)} – {formatDate(itinerary.endDate)}
            </span>
          </div>

          {itinerary.description && (
            <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-4">
              {itinerary.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground font-body">
              {itinerary.days.length} {itinerary.days.length === 1 ? 'day' : 'days'} planned
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
              View trip <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
