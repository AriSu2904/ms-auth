import {loadFilesSync} from "@graphql-tools/load-files";
import * as path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typeDefsFile = loadFilesSync(path.join(__dirname, './schema'), {extensions: ['graphql']});

export const typeDefsList = mergeTypeDefs(typeDefsFile);
