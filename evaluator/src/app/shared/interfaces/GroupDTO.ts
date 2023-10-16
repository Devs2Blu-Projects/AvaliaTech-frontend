import { GroupRatingDTO, PropositionModel } from "."

export interface GroupDTO {
    id: number;
    team: string;
    language: string;
    propositionId: number | null;
    projectName: string;
    projectDescription: string;
    finalGrade: number;
    position: number;
    dateOffset: number;
    userId: number;
    eventId: number;
    
    proposition: PropositionModel | null;
    groupRatings: GroupRatingDTO[] | null;
}
