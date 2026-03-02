import { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
  ArrowLeft, MapPin, Calendar, FileText, Pencil, Trash2,
  Plus, Loader2, ChevronDown, ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ActivityCard from '../components/ActivityCard';
import AddActivityForm from '../components/AddActivityForm';
import {
  useGetItineraryById,
  useDeleteItinerary,
  formatDate,
  getDayCount,
  getDayDate,
} from '../hooks/useQueries';
import { toast } from 'sonner';

export default function ItineraryDetail() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { id?: string };
  const itineraryId = params.id ? BigInt(params.id) : null;

  const { data: itinerary, isLoading, isError } = useGetItineraryById(itineraryId);
  const deleteItinerary = useDeleteItinerary();

  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
  const [addingActivityDay, setAddingActivityDay] = useState<number | null>(null);

  const toggleDay = (dayIndex: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayIndex)) {
        next.delete(dayIndex);
      } else {
        next.add(dayIndex);
      }
      return next;
    });
  };

  const handleDelete = async () => {
    if (!itineraryId) return;
    try {
      await deleteItinerary.mutateAsync(itineraryId);
      toast.success('Trip deleted');
      navigate({ to: '/' });
    } catch {
      toast.error('Failed to delete trip');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-3xl">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="h-10 w-2/3 mb-3" />
        <Skeleton className="h-5 w-1/3 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !itinerary) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-3xl text-center">
        <p className="text-muted-foreground font-body mb-4">Trip not found or failed to load.</p>
        <Button variant="outline" onClick={() => navigate({ to: '/' })}>
          Back to My Trips
        </Button>
      </div>
    );
  }

  const dayCount = getDayCount(itinerary.startDate, itinerary.endDate);

  // Build day slots: use existing days data or create empty slots
  const daySlots = Array.from({ length: dayCount }, (_, i) => {
    const existingDay = itinerary.days[i];
    return {
      index: i,
      date: getDayDate(itinerary.startDate, i),
      activities: existingDay?.activities ?? [],
    };
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-3xl">
      {/* Back */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate({ to: '/' })}
        className="gap-1.5 mb-6 text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        My Trips
      </Button>

      {/* Trip Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2">
              {itinerary.tripName}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-body text-sm">{itinerary.destination}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-body text-sm">
                  {formatDate(itinerary.startDate)} – {formatDate(itinerary.endDate)}
                </span>
              </div>
              <Badge variant="secondary" className="font-body text-xs">
                {dayCount} {dayCount === 1 ? 'day' : 'days'}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                navigate({ to: '/itinerary/$id/edit', params: { id: itinerary.id.toString() } })
              }
              className="gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Trip</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{itinerary.tripName}"? This will permanently remove the trip and all its activities.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleteItinerary.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Delete Trip'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {itinerary.description && (
          <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-4 border border-border">
            <FileText className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {itinerary.description}
            </p>
          </div>
        )}
      </div>

      <Separator className="mb-8" />

      {/* Day-by-Day Timeline */}
      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-5">
          Day-by-Day Itinerary
        </h2>

        <div className="space-y-4">
          {daySlots.map((day) => {
            const isExpanded = expandedDays.has(day.index);
            const isAddingHere = addingActivityDay === day.index;
            const dayLabel = day.date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            });

            return (
              <div
                key={day.index}
                className="border border-border rounded-xl overflow-hidden bg-card shadow-xs"
              >
                {/* Day Header */}
                <button
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/40 transition-colors text-left"
                  onClick={() => toggleDay(day.index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary font-body">
                        {day.index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground font-body">
                        Day {day.index + 1}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">{dayLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {day.activities.length > 0 && (
                      <Badge variant="secondary" className="text-xs font-body">
                        {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'}
                      </Badge>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Day Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border animate-fade-in">
                    <div className="pt-4 space-y-3">
                      {day.activities.length === 0 && !isAddingHere && (
                        <p className="text-sm text-muted-foreground font-body text-center py-4 italic">
                          No activities yet for this day.
                        </p>
                      )}

                      {day.activities.map((activity) => (
                        <ActivityCard
                          key={activity.id.toString()}
                          activity={activity}
                          itineraryId={itinerary.id}
                          dayIndex={day.index}
                        />
                      ))}

                      {isAddingHere ? (
                        <AddActivityForm
                          itineraryId={itinerary.id}
                          dayIndex={day.index}
                          onClose={() => setAddingActivityDay(null)}
                        />
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setAddingActivityDay(day.index)}
                          className="gap-1.5 w-full border-dashed text-muted-foreground hover:text-foreground hover:border-primary/50 mt-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Activity
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
