import qs from "query-string";
import env from "../config/ClientEnvironment";
import { error, info } from "../config/Logging";
const { API_VERSION, CMS_BASE_PATH } = env;
const basePath = CMS_BASE_PATH || "";
const apiVersion = API_VERSION || "v1";

const handleOtherHTTPCodes = (code: number, response: Response) => {
  const codeStartsWith = code.toString()[0];
  info("HTTP-Request/handle non 200", codeStartsWith);
  switch (codeStartsWith) {
    case "3": {
      const redirectLocation = response.headers.get("Location");
      window.location.href = redirectLocation;
    }
  }
};

const coreFetch = async (
  method: string = "GET",
  type: string = "json",
  endpoint: string,
  data: object = {}
): Promise<object | string | boolean | void> => {
  let query: string = null;
  const headers = {};

  // set up request for method type
  if (method === "GET") {
    query = qs.stringify(data);
  } else {
    headers["Content-Type"] = "application/json";
  }

  const requestURI =
    basePath + `/api/${apiVersion}${endpoint}${query ? "?" + query : ""}`;
  info("HTTP-REQUEST/Making " + method + " request to: ", requestURI, data);

  try {
    // 1. try fetch
    const response = await fetch(requestURI, {
      method,
      body: method !== "GET" ? JSON.stringify(data) : undefined,
      headers,
    });

    info("HTTP-REQUEST/got response, checking OK...", response.ok);

    // 2. throw error if there is a bad response code
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    info(response);

    info("HTTP-REQUEST/response OK, checking status", response.status);

    // 3. handle special cases like redirects
    if (response.status.toString()[0] !== "2") {
      info("HTTP-REQUEST/status is non 200, dispatching to handler");
      return handleOtherHTTPCodes(response.status, response);
    }

    info("HTTP-REQUEST/status is in 200 range, processing response");

    // 3. get response JSON or text depending on requested type
    let result = null;
    if (type !== "json") {
      result = response.text();
    } else {
      result = response.json();
    }

    // 4. return result
    return result;
  } catch (e) {
    error("HTTP-Request/Request failed: ", e.message);
    throw new Error(e);
  }
};

export default {
  get: coreFetch.bind(null, "GET", "json"),
  post: coreFetch.bind(null, "POST", "json"),
  put: coreFetch.bind(null, "PUT", "json"),
  patch: coreFetch.bind(null, "PATCH", "json"),
  delete: coreFetch.bind(null, "DELETE", "json"),
};
