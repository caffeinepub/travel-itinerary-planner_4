import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Itinerary } from '../backend';
import { getSampleItinerary } from '../data/sampleItineraries';
import { toast } from 'sonner';

// Query keys
export const QUERY_KEYS = {
  itineraries: ['itineraries'] as const,
  itinerary: (id: bigint) => ['itinerary', id.toString()] as const,
  proposals: ['proposals'] as const,
};

// Convert JS Date to nanoseconds bigint (ICP Time)
export function dateToNano(date: Date): bigint {
  return BigInt(date.getTime()) * BigInt(1_000_000);
}

// Convert nanoseconds bigint to JS Date
export function nanoToDate(nano: bigint): Date {
  return new Date(Number(nano / BigInt(1_000_000)));
}

// Format date for display
export function formatDate(nano: bigint): string {
  return nanoToDate(nano).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Format date for input[type=date]
export function formatDateInput(nano: bigint): string {
  const d = nanoToDate(nano);
  return d.toISOString().split('T')[0];
}

// Get number of days between two dates
export function getDayCount(startNano: bigint, endNano: bigint): number {
  const start = nanoToDate(startNano);
  const end = nanoToDate(endNano);
  const diff = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
}

// Get date for a specific day index
export function getDayDate(startNano: bigint, dayIndex: number): Date {
  const start = nanoToDate(startNano);
  const d = new Date(start);
  d.setDate(d.getDate() + dayIndex);
  return d;
}

// ---- Queries ----

export function useGetAllItineraries() {
  const { actor, isFetching } = useActor();
  return useQuery<Itinerary[]>({
    queryKey: QUERY_KEYS.itineraries,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllItineraries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetItineraryById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Itinerary>({
    queryKey: QUERY_KEYS.itinerary(id ?? BigInt(0)),
    queryFn: async () => {
      if (!actor || id === null) throw new Error('No actor or id');
      return actor.getItineraryById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

// ---- Mutations ----

export function useCreateItinerary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      tripName: string;
      destination: string;
      startDate: Date;
      endDate: Date;
      description: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.createItinerary(
        params.tripName,
        params.destination,
        dateToNano(params.startDate),
        dateToNano(params.endDate),
        params.description
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itineraries });
    },
  });
}

export function useUpdateItinerary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      tripName: string;
      destination: string;
      startDate: Date;
      endDate: Date;
      description: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.updateItinerary(
        params.id,
        params.tripName,
        params.destination,
        dateToNano(params.startDate),
        dateToNano(params.endDate),
        params.description
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itineraries });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itinerary(vars.id) });
    },
  });
}

export function useDeleteItinerary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('No actor');
      return actor.deleteItinerary(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itineraries });
    },
  });
}

export function useAddActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      itineraryId: bigint;
      dayIndex: bigint;
      title: string;
      time: string;
      location: string;
      notes: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.addActivity(
        params.itineraryId,
        params.dayIndex,
        params.title,
        params.time,
        params.location,
        params.notes
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itinerary(vars.itineraryId) });
    },
  });
}

export function useUpdateActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      itineraryId: bigint;
      dayIndex: bigint;
      activityId: bigint;
      title: string;
      time: string;
      location: string;
      notes: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.updateActivity(
        params.itineraryId,
        params.dayIndex,
        params.activityId,
        params.title,
        params.time,
        params.location,
        params.notes
      );
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itinerary(vars.itineraryId) });
    },
  });
}

export function useDeleteActivity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      itineraryId: bigint;
      dayIndex: bigint;
      activityId: bigint;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.deleteActivity(params.itineraryId, params.dayIndex, params.activityId);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itinerary(vars.itineraryId) });
    },
  });
}

// ---- Sample Itinerary Generation ----

export function useGenerateSampleItinerary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (country: string): Promise<bigint> => {
      if (!actor) throw new Error('No actor');

      const sample = getSampleItinerary(country);

      // Create the base itinerary
      const itineraryId = await actor.createItinerary(
        sample.tripName,
        sample.destination,
        dateToNano(sample.startDate),
        dateToNano(sample.endDate),
        sample.description
      );

      return itineraryId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.itineraries });
      toast.success('Sample itinerary generated!');
    },
    onError: () => {
      toast.error('Failed to generate sample itinerary. Please try again.');
    },
  });
}

// ---- Proposal Mutations ----

export function useSubmitProposal() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      requesterName: string;
      email: string;
      destination: string;
      preferredStartDate: Date;
      preferredEndDate: Date;
      notes: string;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.submitProposal(
        params.requesterName,
        params.email,
        params.destination,
        dateToNano(params.preferredStartDate),
        dateToNano(params.preferredEndDate),
        params.notes
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.proposals });
    },
    onError: () => {
      toast.error('Failed to submit proposal. Please try again.');
    },
  });
}
