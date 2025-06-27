import { baseApi } from "../baseApi";


export const adminApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getDashboard:builder.query({
            query:()=>"admin/dashboard",
            providesTags:["DashboardSummary"]
        })
    })
})

export  const{
    useGetDashboardQuery
}=adminApi