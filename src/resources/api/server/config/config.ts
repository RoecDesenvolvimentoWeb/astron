import { mode } from "mode";

export const config: IApiDefinition = {
    baseUrl: mode === "DEV" ? "http://127.0.0.1:3000" : "https://astron.website:8080"
}