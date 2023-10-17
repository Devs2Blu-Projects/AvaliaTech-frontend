import { EventCriterionModel } from "."

export interface CriterionModel {
  id: number;
  name: string;
  description: string;
  weight: number;

  eventCriteria: EventCriterionModel[] | null;
}