import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
        credentials:"include",
    }),
    tagTypes: ["Habits,SummaryStats", "HabitDetails", "HabitLogs","Category"],
    endpoints:()=>({}),
});