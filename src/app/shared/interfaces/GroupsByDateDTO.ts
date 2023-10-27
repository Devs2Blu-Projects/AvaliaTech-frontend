import { GroupDTO } from ".";

export interface GroupsByDateDTO {
    date: string;
    
    groups: GroupDTO[];
}