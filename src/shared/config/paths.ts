import { homepage } from "../../../package.json";

const relativePath = homepage.split("/")[3];
export const basePath = relativePath ? `/${relativePath}/` : undefined;
