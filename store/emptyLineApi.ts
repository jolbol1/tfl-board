// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyLineApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.tfl.gov.uk/Line/" }),
  reducerPath: "lineApi",
  endpoints: () => ({}),
});
