import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearch } from '@tanstack/react-router';
import { ArrowLeft, Loader2, Save, MapPin, Calendar, FileText, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useGetItineraryById,
  useCreateItinerary,
  useUpdateItinerary,
  formatDateInput,
} from '../hooks/useQueries';
import { toast } from 'sonner';

export default function ItineraryForm() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { id?: string };
  const isEdit = !!params.id && params.id !== 'new';
  const itineraryId = isEdit ? BigInt(params.id!) : null;

  // Read destination pre-fill from URL search params (only on new itinerary)
  const search = useSearch({ strict: false }) as { destination?: string };
  const prefilledDestination = !isEdit && search?.destination ? search.destination : '';

  const { data: existing, isLoading: loadingExisting } = useGetItineraryById(itineraryId);

  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState(prefilledDestination);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createItinerary = useCreateItinerary();
  const updateItinerary = useUpdateItinerary();

  // Pre-populate form when editing
  useEffect(() => {
    if (existing && isEdit) {
      setTripName(existing.tripName);
      setDestination(existing.destination);
      setStartDate(formatDateInput(existing.startDate));
      setEndDate(formatDateInput(existing.endDate));
      setDescription(existing.description);
    }
  }, [existing, isEdit]);

  // Apply prefilled destination from URL on mount (new itinerary only)
  useEffect(() => {
    if (!isEdit && prefilledDestination) {
      setDestination(prefilledDestination);
    }
  }, [prefilledDestination, isEdit]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!tripName.trim()) newErrors.tripName = 'Trip name is required';
    if (!destination.trim()) newErrors.destination = 'Destination is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEdit && itineraryId !== null) {
        await updateItinerary.mutateAsync({
          id: itineraryId,
          tripName: tripName.trim(),
          destination: destination.trim(),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          description: description.trim(),
        });
        toast.success('Trip updated successfully!');
        navigate({ to: '/itinerary/$id', params: { id: itineraryId.toString() } });
      } else {
        const newId = await createItinerary.mutateAsync({
          tripName: tripName.trim(),
          destination: destination.trim(),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          description: description.trim(),
        });
        toast.success('Trip created successfully!');
        navigate({ to: '/itinerary/$id', params: { id: newId.toString() } });
      }
    } catch {
      toast.error(isEdit ? 'Failed to update trip' : 'Failed to create trip');
    }
  };

  const isPending = createItinerary.isPending || updateItinerary.isPending;

  if (isEdit && loadingExisting) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="space-y-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
      {/* Back button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          navigate({
            to: isEdit ? '/itinerary/$id' : '/',
            params: isEdit ? { id: itineraryId!.toString() } : undefined,
          })
        }
        className="gap-1.5 mb-6 text-muted-foreground hover:text-foreground -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        {isEdit ? 'Back to trip' : 'Back to trips'}
      </Button>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-1">
          {isEdit ? 'Edit Trip' : 'Plan a New Trip'}
        </h1>
        <p className="text-muted-foreground font-body">
          {isEdit ? 'Update your trip details below.' : 'Fill in the details to start your adventure.'}
        </p>
      </div>

      <Card className="border border-border shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="font-display text-lg">Trip Details</CardTitle>
          <CardDescription className="font-body text-sm">
            Tell us about your upcoming journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Trip Name */}
            <div className="space-y-1.5">
              <Label htmlFor="tripName" className="flex items-center gap-1.5 text-sm font-medium">
                <Tag className="w-3.5 h-3.5 text-primary" />
                Trip Name *
              </Label>
              <Input
                id="tripName"
                value={tripName}
                onChange={(e) => {
                  setTripName(e.target.value);
                  if (errors.tripName) setErrors((p) => ({ ...p, tripName: '' }));
                }}
                placeholder="e.g. Italian Summer Adventure"
                className={errors.tripName ? 'border-destructive' : ''}
              />
              {errors.tripName && (
                <p className="text-xs text-destructive font-body">{errors.tripName}</p>
              )}
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <Label htmlFor="destination" className="flex items-center gap-1.5 text-sm font-medium">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Destination *
              </Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (errors.destination) setErrors((p) => ({ ...p, destination: '' }));
                }}
                placeholder="e.g. Rome, Italy"
                className={errors.destination ? 'border-destructive' : ''}
              />
              {errors.destination && (
                <p className="text-xs text-destructive font-body">{errors.destination}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="startDate" className="flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (errors.startDate) setErrors((p) => ({ ...p, startDate: '' }));
                  }}
                  className={errors.startDate ? 'border-destructive' : ''}
                />
                {errors.startDate && (
                  <p className="text-xs text-destructive font-body">{errors.startDate}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endDate" className="flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  End Date *
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={startDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    if (errors.endDate) setErrors((p) => ({ ...p, endDate: '' }));
                  }}
                  className={errors.endDate ? 'border-destructive' : ''}
                />
                {errors.endDate && (
                  <p className="text-xs text-destructive font-body">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="description" className="flex items-center gap-1.5 text-sm font-medium">
                <FileText className="w-3.5 h-3.5 text-primary" />
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this trip about? Any special plans or goals..."
                className="min-h-[100px] resize-none font-body"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="gap-2 flex-1 sm:flex-none"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isEdit ? 'Save Changes' : 'Create Trip'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  navigate({
                    to: isEdit ? '/itinerary/$id' : '/',
                    params: isEdit ? { id: itineraryId!.toString() } : undefined,
                  })
                }
                disabled={isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
