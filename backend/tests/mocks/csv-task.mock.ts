import { faker } from '@faker-js/faker';
import { CSVTask } from 'src/models/csv-task.model';
import { TaskStatus } from 'src/models/task-status';

export class CSVTaskMock {
    private data: CSVTask = {
        task_owner: faker.name.fullName(),
        email: faker.internet.email(),
        company_name: faker.company.name(),
        task_date: new Date().toLocaleDateString(),
        task_description: faker.random.words(10),
        task_status: TaskStatus.APPROVED,
    };

    public withTaskStatus(status: TaskStatus) {
        this.data.task_status = status;
        return this;
    }

    public model(): CSVTask {
        return this.data;
    }
}
