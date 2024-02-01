import { faker } from '@faker-js/faker';
import { FileMeta, FileMetaStatus } from 'models';

export class FileMetaMock {
    private data: FileMeta = {
        id: faker.datatype.uuid(),
        file: faker.datatype.string(),
        created: faker.date.recent(),
        status: FileMetaStatus.PROCESSING,
    };

    public withFile(file: string) {
        this.data.file = file;
        return this;
    }

    public model(): FileMeta {
        return this.data;
    }
}
