import { randomUUID } from 'crypto';
import { FileMeta, FileMetaStatus } from 'models';

export class FileMetaMapper {
    public mapFileToFileMeta(file: string): FileMeta {
        return {
            id: randomUUID(),
            file: file,
            created: new Date(),
            status: FileMetaStatus.PROCESSING,
        };
    }
}
