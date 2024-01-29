import axios from "axios";

import { API_URL } from "shared/config";

// Potentially, you could pass an accessToken
export const apiInstance = axios.create({
  baseURL: API_URL,
});
