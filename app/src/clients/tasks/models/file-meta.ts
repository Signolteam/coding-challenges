export interface FileMeta {
    id: string;
    file: string;
    created: Date;
    status: FileMetaStatus;
}

export enum FileMetaStatus {
    PROCESSING = 'PROCESSING',
    FAILED = 'FAILED',
    COMPLETE = 'COMPLETE',
}
