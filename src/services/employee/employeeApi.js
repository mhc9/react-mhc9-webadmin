import { baseApi } from '../baseApi';

export const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPostInitialFormData: builder.query({
            query: () => ({
                url: '/api/employees/init/form'
            }),
        }),
    }),
    overrideExisting: false, // Prevents accidental overwrites in HMR/tests
});

export const { useGetEmployeeInitialFormDataQuery } = employeeApi;