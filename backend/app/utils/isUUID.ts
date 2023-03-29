/** from https://stackoverflow.com/a/13653180 */
const REGEX_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function isUUID(s: any) {
  return typeof s === "string" && REGEX_UUID.test(s);
}
