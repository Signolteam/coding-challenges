import { CSVTask } from 'src/models/csv-task.model';
import { TaskMapper } from 'src/mappers/task.mapper';
import { Task } from 'src/models/task.model';
import { TaskStatus } from 'src/models/task-status';
import { CSVTaskMock } from 'tests/mocks/csv-task.mock';
import { TaskRequest } from 'src/models/task-request.model';
import { TaskRequestMock } from 'tests/mocks/task-request.mock';

describe('Task mapper unit tests', () => {
    it.each([TaskStatus.APPROVED, TaskStatus.IN_REVIEW, TaskStatus.REJECTED])(
        'successfully map csv task to task',
        (status) => {
            // Arrange
            const csvTask: CSVTask = new CSVTaskMock().withTaskStatus(status).model();

            const expected: Task = {
                id: expect.any(String),
                owner: csvTask.task_owner,
                email: csvTask.email,
                company: csvTask.company_name,
                date: csvTask.task_date,
                description: csvTask.task_description,
                status: csvTask.task_status as TaskStatus,
            };

            const sut = new TaskMapper();

            // Act
            const result = sut.mapCSVToTask(csvTask);

            // Assert
            expect(result).toEqual(expected);
        },
    );

    it.each([TaskStatus.APPROVED, TaskStatus.IN_REVIEW, TaskStatus.REJECTED])(
        'successfully map request to task',
        (status) => {
            // Arrange
            const task: TaskRequest = new TaskRequestMock().withStatus(status).model();

            const expected: Task = {
                owner: task.owner,
                email: task.email,
                company: task.company,
                date: task.date,
                description: task.description,
                status: task.status as TaskStatus,
            };

            const sut = new TaskMapper();

            // Act
            const result = sut.mapRequestToTask(task);

            // Assert
            expect(result).toEqual(expected);
        },
    );
});
