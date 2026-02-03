import type { components } from "./api.generated";

export type Section = components["schemas"]["SectionDto"];
export type CreateSectionRequest = components["schemas"]["CreateSectionDto"];
export type UpdateSectionRequest = components["schemas"]["UpdateSectionDto"];

export type Lecture = components["schemas"]["LectureDto"];
export type CreateLectureRequest = Omit<components["schemas"]["CreateLectureDto"], "isFree"> & { isFree?: boolean };
// UpdateLectureDto seems missing in the generated types, usually it's a Partial of Create or same
export type UpdateLectureRequest = Partial<CreateLectureRequest>;

export type SectionResponse = components["schemas"]["WrappedResponseSectionListResponseDto"];
export type SingleSectionResponse = components["schemas"]["WrappedResponseSectionResponseDto"];
export type DeleteSectionResponse = components["schemas"]["WrappedResponseSectionDeleteResponseDto"];
