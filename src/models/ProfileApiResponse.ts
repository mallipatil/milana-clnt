import { AppError } from "./app-error";
import { ProfileData } from "./ProfileData";

export interface ProfileApiResponse {
  data: ProfileData[] | null; // Update the data type to an array of ProfileData
  error: AppError | null;
}