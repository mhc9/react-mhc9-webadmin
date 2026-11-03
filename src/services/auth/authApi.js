import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: '/api/auth/me',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false, // Prevents accidental overwrites in HMR/tests
});

export const { useGetUserDetailsQuery } = authApi;
