import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import List "mo:core/List";



actor {
  type Activity = {
    id : Nat;
    title : Text;
    time : Text;
    location : Text;
    notes : Text;
  };

  type Day = {
    date : Time.Time;
    activities : [Activity];
  };

  type Itinerary = {
    id : Nat;
    tripName : Text;
    destination : Text;
    startDate : Time.Time;
    endDate : Time.Time;
    description : Text;
    days : [Day];
  };

  module Itinerary {
    public func compare(a : Itinerary, b : Itinerary) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Proposal = {
    id : Nat;
    requesterName : Text;
    email : Text;
    destination : Text;
    preferredStartDate : Time.Time;
    preferredEndDate : Time.Time;
    notes : Text;
    submittedAt : Time.Time;
  };

  let itineraryMap = Map.empty<Nat, Itinerary>();
  var nextItineraryId = 0;
  var nextActivityId = 0;

  // Proposal persistent storage
  let proposalMap = Map.empty<Nat, Proposal>();
  var nextProposalId = 0;

  public shared ({ caller }) func createItinerary(tripName : Text, destination : Text, startDate : Time.Time, endDate : Time.Time, description : Text) : async Nat {
    let id = nextItineraryId;
    nextItineraryId += 1;

    let itinerary : Itinerary = {
      id;
      tripName;
      destination;
      startDate;
      endDate;
      description;
      days = [];
    };

    itineraryMap.add(id, itinerary);
    id;
  };

  public query ({ caller }) func getAllItineraries() : async [Itinerary] {
    itineraryMap.values().toArray().sort();
  };

  public query ({ caller }) func getItineraryById(id : Nat) : async Itinerary {
    switch (itineraryMap.get(id)) {
      case (?itinerary) { itinerary };
      case (null) { Runtime.trap("Itinerary not found") };
    };
  };

  public shared ({ caller }) func updateItinerary(id : Nat, tripName : Text, destination : Text, startDate : Time.Time, endDate : Time.Time, description : Text) : async () {
    switch (itineraryMap.get(id)) {
      case (?existing) {
        let updated : Itinerary = {
          id;
          tripName;
          destination;
          startDate;
          endDate;
          description;
          days = existing.days;
        };
        itineraryMap.add(id, updated);
      };
      case (null) { Runtime.trap("Itinerary not found") };
    };
  };

  public shared ({ caller }) func deleteItinerary(id : Nat) : async () {
    switch (itineraryMap.get(id)) {
      case (null) { Runtime.trap("Itinerary not found") };
      case (?_) {
        itineraryMap.remove(id);
      };
    };
  };

  public shared ({ caller }) func addActivity(itineraryId : Nat, dayIndex : Nat, title : Text, time : Text, location : Text, notes : Text) : async () {
    let itinerary = switch (itineraryMap.get(itineraryId)) {
      case (?itinerary) { itinerary };
      case (null) { Runtime.trap("Itinerary not found") };
    };

    if (dayIndex >= itinerary.days.size()) {
      Runtime.trap("Day index out of bounds");
    };

    let activityId = nextActivityId;
    nextActivityId += 1;

    let activity : Activity = {
      id = activityId;
      title;
      time;
      location;
      notes;
    };

    let newDays = Array.tabulate(itinerary.days.size(), func(i) { itinerary.days[i] });
    let dayToUpdate = newDays[dayIndex];
    let newActivities = dayToUpdate.activities.concat([activity]);
    let updatedDay : Day = {
      date = dayToUpdate.date;
      activities = newActivities;
    };

    let finalDays = Array.tabulate(newDays.size(), func(i) { if (i == dayIndex) { updatedDay } else { newDays[i] } });
    let updatedItinerary : Itinerary = {
      id = itinerary.id;
      tripName = itinerary.tripName;
      destination = itinerary.destination;
      startDate = itinerary.startDate;
      endDate = itinerary.endDate;
      description = itinerary.description;
      days = finalDays;
    };

    itineraryMap.add(itineraryId, updatedItinerary);
  };

  public shared ({ caller }) func updateActivity(itineraryId : Nat, dayIndex : Nat, activityId : Nat, title : Text, time : Text, location : Text, notes : Text) : async () {
    let itinerary = switch (itineraryMap.get(itineraryId)) {
      case (?itinerary) { itinerary };
      case (null) { Runtime.trap("Itinerary not found") };
    };

    if (dayIndex >= itinerary.days.size()) {
      Runtime.trap("Day index out of bounds");
    };

    let dayToUpdate = itinerary.days[dayIndex];
    let activityIndex = dayToUpdate.activities.findIndex(func(a) { a.id == activityId });

    switch (activityIndex) {
      case (?index) {
        let updatedActivities = Array.tabulate(dayToUpdate.activities.size(), func(i) {
          if (i == index) {
            {
              id = activityId;
              title;
              time;
              location;
              notes;
            };
          } else {
            dayToUpdate.activities[i];
          };
        });
        let updatedDay : Day = {
          date = dayToUpdate.date;
          activities = updatedActivities;
        };

        let updatedDays = Array.tabulate(itinerary.days.size(), func(i) { if (i == dayIndex) { updatedDay } else { itinerary.days[i] } });
        let updatedItinerary : Itinerary = {
          id = itinerary.id;
          tripName = itinerary.tripName;
          destination = itinerary.destination;
          startDate = itinerary.startDate;
          endDate = itinerary.endDate;
          description = itinerary.description;
          days = updatedDays;
        };

        itineraryMap.add(itineraryId, updatedItinerary);
      };
      case (null) { Runtime.trap("Activity not found") };
    };
  };

  public shared ({ caller }) func deleteActivity(itineraryId : Nat, dayIndex : Nat, activityId : Nat) : async () {
    let itinerary = switch (itineraryMap.get(itineraryId)) {
      case (?itinerary) { itinerary };
      case (null) { Runtime.trap("Itinerary not found") };
    };

    if (dayIndex >= itinerary.days.size()) {
      Runtime.trap("Day index out of bounds");
    };

    let dayToUpdate = itinerary.days[dayIndex];
    let activityIndex = dayToUpdate.activities.findIndex(func(a) { a.id == activityId });

    switch (activityIndex) {
      case (?index) {
        let newActivities = Array.tabulate(dayToUpdate.activities.size() - 1, func(i) {
          if (i < index) {
            dayToUpdate.activities[i];
          } else {
            dayToUpdate.activities[i + 1];
          };
        });

        let updatedDay : Day = {
          date = dayToUpdate.date;
          activities = newActivities;
        };

        let updatedDays = Array.tabulate(itinerary.days.size(), func(i) {
          if (i == dayIndex) { updatedDay } else { itinerary.days[i] };
        });

        let updatedItinerary : Itinerary = {
          id = itinerary.id;
          tripName = itinerary.tripName;
          destination = itinerary.destination;
          startDate = itinerary.startDate;
          endDate = itinerary.endDate;
          description = itinerary.description;
          days = updatedDays;
        };

        itineraryMap.add(itineraryId, updatedItinerary);
      };
      case (null) { Runtime.trap("Activity not found") };
    };
  };

  // Proposal Handling
  public shared ({ caller }) func submitProposal(
    requesterName : Text,
    email : Text,
    destination : Text,
    preferredStartDate : Time.Time,
    preferredEndDate : Time.Time,
    notes : Text,
  ) : async Nat {
    let id = nextProposalId;
    nextProposalId += 1;

    let proposal : Proposal = {
      id;
      requesterName;
      email;
      destination;
      preferredStartDate;
      preferredEndDate;
      notes;
      submittedAt = Time.now();
    };

    proposalMap.add(id, proposal);
    id;
  };

  public query ({ caller }) func getAllProposals() : async [Proposal] {
    proposalMap.values().toArray();
  };

  public shared ({ caller }) func deleteProposal(id : Nat) : async () {
    switch (proposalMap.get(id)) {
      case (null) { Runtime.trap("Proposal not found") };
      case (?_) {
        proposalMap.remove(id);
      };
    };
  };
};
