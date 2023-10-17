import { EventModel } from ".";

export interface PropositionModel {
  id: number;
  name: string;
  eventId: number;
  
  event: EventModel | null;
}