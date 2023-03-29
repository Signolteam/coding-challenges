import generateID from "../app/utils/generateID";
describe("generateID", () => {
  it("returns a string", () => {
    const actual = generateID();
    expect(typeof actual).toEqual("string");
    expect(actual).toHaveLength(36);
    //basic UUID character check
    expect(/^[0-9a-f\-]+$/i.test(actual)).toBe(true);
  });
  it("returned string is a UUID", () => {
    const actual = generateID();
    expect(actual).toHaveLength(36);
    //basic UUID character check
    expect(/^[0-9a-f\-]+$/i.test(actual)).toBe(true);
  });
});
