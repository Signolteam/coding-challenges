import { randomUUID } from "node:crypto";
export default function generateID() {
  return randomUUID();
}
