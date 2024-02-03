import { faker } from '@faker-js/faker';
import { FileMetaMapper } from 'mappers';
import { FileMetaStatus } from 'models';

describe('File meta mapper tests', () => {
    it('Map file', () => {
        // Arrange
        const file = faker.datatype.string();
        const sut = new FileMetaMapper();

        // Act
        const result = sut.mapFileToFileMeta(file);

        // Assert
        expect(result.status).toBe(FileMetaStatus.PROCESSING);
        expect(result.file).toBe(file);
        expect(result.created.getDate()).toBe(new Date().getDate());
        expect(result.id).toBeDefined();
    });
});
