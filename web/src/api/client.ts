import createClient from "openapi-fetch";
import type { components, paths } from "./schema";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const api = createClient<paths>({ baseUrl: API_URL });

export type HealthResponse = components["schemas"]["HealthResponse"];