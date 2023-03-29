import { TaskStates } from "../enum/TaskStates";

export default interface UpdateTaskDTO {
  task_status: TaskStates;
}

/** @returns error messages. Valid if this returned an empty array */
export function ValidateUpdateTaskDTO(dto: UpdateTaskDTO): string[] {
  let errors = [];
  if (dto.task_status) {
    const allTaskStates = [
      TaskStates.APPROVED,
      TaskStates.IN_REVIEW,
      TaskStates.REJECTED,
    ];
    if (!allTaskStates.includes(dto["task_status"])) {
      errors.push("task_status must be one of " + allTaskStates.join(","));
    }
  } else {
    errors.push("No values provided to update");
  }
  return errors;
}
