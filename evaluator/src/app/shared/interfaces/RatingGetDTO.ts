import { GroupDTO, UserDTO } from "."

export interface RatingGetDTO {
  Grade: number
  Group: GroupDTO | null
  User: UserDTO | null
}