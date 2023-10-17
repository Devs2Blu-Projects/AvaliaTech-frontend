import { CriterionModel, EventModel } from "."

export interface EventCriterionModel {
  id: number;
  weight: number;
  eventId: number;
  criterionId: number;
  
  event: EventModel | null;
  criterion: CriterionModel | null;
}