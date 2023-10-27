import { GroupDTO, UserDTO } from "."

export interface RatingGetDTO {
  grade: number
  group: GroupDTO | null
  user: UserDTO | null
}