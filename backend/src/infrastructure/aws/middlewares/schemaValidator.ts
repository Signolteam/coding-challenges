import { ZodSchema } from 'zod';
import { generateErrorMessage, ErrorMessageOptions } from 'zod-error';
import { BadRequest } from 'http-errors';

export const schemaValidator = (schema?: ZodSchema<any, any>) => {
    const before = async (request: any) => {
        if (schema) {
            const result = await schema.safeParseAsync(request.event);
            if (!result.success) {
                const errorMessage = generateErrorMessage(result.error.issues, options);
                throw new BadRequest(errorMessage);
            }
        }

        return Promise.resolve();
    };

    return {
        before,
    };
};

const options: ErrorMessageOptions = {
    delimiter: {
        error: ' 🔥 ',
    },
    transform: ({ errorMessage, index }) => `Validation #${index + 1}: ${errorMessage}`,
};
