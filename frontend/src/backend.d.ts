import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Day {
    date: Time;
    activities: Array<Activity>;
}
export interface Activity {
    id: bigint;
    title: string;
    time: string;
    notes: string;
    location: string;
}
export type Time = bigint;
export interface Itinerary {
    id: bigint;
    destination: string;
    tripName: string;
    endDate: Time;
    days: Array<Day>;
    description: string;
    startDate: Time;
}
export interface Proposal {
    id: bigint;
    preferredStartDate: Time;
    destination: string;
    submittedAt: Time;
    email: string;
    preferredEndDate: Time;
    notes: string;
    requesterName: string;
}
export interface backendInterface {
    addActivity(itineraryId: bigint, dayIndex: bigint, title: string, time: string, location: string, notes: string): Promise<void>;
    createItinerary(tripName: string, destination: string, startDate: Time, endDate: Time, description: string): Promise<bigint>;
    deleteActivity(itineraryId: bigint, dayIndex: bigint, activityId: bigint): Promise<void>;
    deleteItinerary(id: bigint): Promise<void>;
    deleteProposal(id: bigint): Promise<void>;
    getAllItineraries(): Promise<Array<Itinerary>>;
    getAllProposals(): Promise<Array<Proposal>>;
    getItineraryById(id: bigint): Promise<Itinerary>;
    submitProposal(requesterName: string, email: string, destination: string, preferredStartDate: Time, preferredEndDate: Time, notes: string): Promise<bigint>;
    updateActivity(itineraryId: bigint, dayIndex: bigint, activityId: bigint, title: string, time: string, location: string, notes: string): Promise<void>;
    updateItinerary(id: bigint, tripName: string, destination: string, startDate: Time, endDate: Time, description: string): Promise<void>;
}
