import { EventCriterionModel, PropositionModel } from "."

export interface EventModel {
  id: number;
  name: string;
  totalWeight: number;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  isPublic: boolean;

  propositions: PropositionModel[] | null;
  eventCriteria: EventCriterionModel[] | null;
}