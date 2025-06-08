import { baseApi } from "../baseApi";
export const statsApi = baseApi.injectEndpoints({
    
    endpoints:(builder)=>( {
        getSummaryStats: builder.query({
            query: () => "stats/summary",
            providesTags: ["SummaryStats"],
        }),
        getHabitDetails: builder.query({
            query:()=> "stats/habit-details",
            providesTags: ["HabitDetails"],
        })
    })
}); 

export const{
    useGetSummaryStatsQuery,
    useGetHabitDetailsQuery,
}= statsApi;