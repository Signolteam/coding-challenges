import { dateRegex } from 'src/helpers/regex';

describe('Regex helpers unit tests', () => {
    it.each(['25/01/2024', '12/25/2023'])('Validate dates', (date: string) => {
        expect(dateRegex().test(date)).toBe(true);
    });
});
