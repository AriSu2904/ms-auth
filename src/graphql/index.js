import { fileURLToPath } from "url";
import { dirname } from "path";
import {combineSchema} from "ck-gql-utils/src/schema-merger.js";

const directoryName = dirname(fileURLToPath(import.meta.url));

export const typeDefsList = combineSchema(directoryName);
