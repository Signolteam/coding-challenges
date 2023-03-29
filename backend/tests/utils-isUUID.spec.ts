import isUUID from "../app/utils/isUUID";
import { randomUUID } from "node:crypto";
describe("isUUID", () => {
  it("returns true for a valid uuid v4", () => {
    const validUUID = "8e2d04b5-1124-46dd-bcf8-c782fe5fcf81";

    const actual = isUUID(validUUID);
    expect(actual).toBe(true);
  });

  it.each([
    undefined,
    null,
    "",
    "8e2d04b5",
    "abf5e346-31ed-40b9-9bf1-XXXXXXXXXXXX",
    "XXXXXXXX-01f0-4339-8ea0-27e58102f839",
    "aacd48c6-998e-40d4-9df5-e0aab0c88db1a7967d66-2ad4-4e04-993b-6ee37410e9a2",
  ])("returns false for invalid uuid %s", (s) => {
    const actual = isUUID(s);
    expect(actual).toBe(false);
  });

  it("returns true for values created by crypto.randomUUID", () => {
    for (let i = 0; i < 10; i++) {
      const uuid = randomUUID();
      const actual = isUUID(uuid);
      expect(actual).toBe(true);
    }
  });
});
