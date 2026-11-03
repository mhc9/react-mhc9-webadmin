import { baseApi } from '../baseApi';

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPostInitialFormData: builder.query({
            query: () => ({
                url: '/api/posts/init/form'
            }),
        }),
    }),
    overrideExisting: false, // Prevents accidental overwrites in HMR/tests
});

export const { useGetPostInitialFormDataQuery } = postApi;
