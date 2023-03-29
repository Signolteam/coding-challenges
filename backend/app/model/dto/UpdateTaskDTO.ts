import { TaskStates } from "../enum/TaskStates";

export default interface UpdateTaskDTO {
  task_status: TaskStates;
}

/** @returns error messages. Valid if this returned an empty array */
export function ValidateUpdateTaskDTO(dto: UpdateTaskDTO): string[] {
  let errors = [];
  if (dto.task_status) {
    const allowedDestinationTaskStates = [
      TaskStates.APPROVED,
      //TaskStates.IN_REVIEW,
      TaskStates.REJECTED,
    ];
    if (!allowedDestinationTaskStates.includes(dto["task_status"])) {
      errors.push(
        "task_status must be one of " + allowedDestinationTaskStates.join(",")
      );
    }
  } else {
    errors.push("No values provided to update");
  }
  return errors;
}
