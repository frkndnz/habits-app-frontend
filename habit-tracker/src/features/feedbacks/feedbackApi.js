import { baseApi } from "../baseApi";

export const feedbackApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getFeedbacks:builder.query({
            query:({page=1,pageSize=5})=> {
              const params=new URLSearchParams({
                page:page.toString(),
                pageSize:pageSize.toString()
              }) ;
              return {
                    url: `/feedbacks?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags:['Feedbacks'],

        }),
    })
})

export const{
    useGetFeedbacksQuery
}=feedbackApi;