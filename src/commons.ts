import { v5 as uuidv5 } from "uuid";
import { NamespaceUuid } from "./constants";

export function getUuid(strings: string[]): string {
  const combinedString = strings.join(",");
  return uuidv5(combinedString, NamespaceUuid);
}
