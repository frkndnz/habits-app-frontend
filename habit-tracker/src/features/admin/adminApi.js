import { baseApi } from "../baseApi";


export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => "admin/dashboard",
            providesTags: ["DashboardSummary"]
        }),
        getLogsSummary: builder.query({
            query: () => "admin/logs/summary",
            providesTags: ["LogsSummary"]
        }),
        getLogs: builder.query({
            query: ({ page, pageSize }) => {
                const params = new URLSearchParams({
                    page: page.toString(),
                    pageSize: pageSize.toString()
                });
                return {
                    url: `/admin/logs?${params.toString()}`,
                    method: "GET",
                };
            },
        })
    })
})
export const {
        useGetDashboardQuery,
        useGetLogsSummaryQuery,
        useGetLogsQuery

    } = adminApi