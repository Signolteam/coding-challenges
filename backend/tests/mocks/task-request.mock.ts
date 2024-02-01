import { faker } from '@faker-js/faker';
import { TaskRequest } from 'src/models/task-request.model';
import { TaskStatus } from 'src/models/task-status';

export class TaskRequestMock {
    private data: TaskRequest = {
        owner: faker.name.fullName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        date: new Date().toLocaleDateString(),
        description: faker.random.words(10),
        status: TaskStatus.APPROVED,
    };

    public withStatus(status: TaskStatus) {
        this.data.status = status;
        return this;
    }

    public model(): TaskRequest {
        return this.data;
    }
}
