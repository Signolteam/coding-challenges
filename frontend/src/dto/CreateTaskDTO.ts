import { TaskStates } from "../enum/TaskStates";

/** This matches the data CSV */
export default interface CreateTaskDTO {
  task_owner: string;
  email: string;
  company_name?: string;
  task_date?: Date;
  task_description?: string;
  task_status?: TaskStates;
}

/** @returns error messages. Valid if this returned an empty array */
export function ValidateCreateTaskDTO(dto: CreateTaskDTO): string[] {
  let errors = [];
  if (dto) {
    if (!dto.task_owner) {
      errors.push("task_owner is a required column");
    }
    if (!dto.email) {
      errors.push("email is a required column");
    }
    if (dto.task_status) {
      const allTaskStates = [
        TaskStates.APPROVED,
        TaskStates.IN_REVIEW,
        TaskStates.REJECTED,
      ];
      if (!allTaskStates.includes(dto["task_status"])) {
        errors.push("task_status must be one of " + allTaskStates.join(","));
      }
    }
  } else {
    errors.push("cannot create empty rows");
  }
  return errors;
}
