import { faker } from '@faker-js/faker';
import { Task, TaskStatus } from 'models';

export class TaskMock {
    private data: Task = {
        id: faker.datatype.uuid(),
        owner: faker.name.fullName().slice(0, 249).replace(',', ''),
        email: faker.internet.email().slice(0, 249).replace(',', ''),
        company: faker.company.name().slice(0, 249).replace(',', ''),
        date: faker.date.past().toLocaleDateString(),
        description: faker.random.words(10).slice(0, 999).replace(',', ''),
        status: TaskStatus.APPROVED,
    };

    public withId(id: string) {
        this.data.id = id;
        return this;
    }

    public withStatus(status: TaskStatus) {
        this.data.status = status;
        return this;
    }

    public model(): Task {
        return this.data;
    }
}
