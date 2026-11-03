import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        /** For using stateless */
        const token = localStorage.getItem("access_token");

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        /** For using stateful */
        // const match = document.cookie.match(/(^|;\s*)XSRF-TOKEN=([^;]*)/);
        // const xsrfToken = match ? decodeURIComponent(match[2]) : null;

        // if (xsrfToken) {
        //     headers.set('X-XSRF-TOKEN', xsrfToken);
        // }

        return headers;
    },
});

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    endpoints: () => ({}), // Empty endpoints to be injected later
});