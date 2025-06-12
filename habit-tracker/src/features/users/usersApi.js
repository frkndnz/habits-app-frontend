import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ searchTerm = "", page = 1, pageSize = 10 }) => {
                const params = new URLSearchParams({
                    searchTerm,
                    page: page.toString(),
                    pageSize: pageSize.toString(),
                });

                return {
                    url: `/users?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Users"],
        }),
        updateUser:builder.mutation({
            query:(user)=>({
                url:`/users/${user.id}`,
                method:'PUT',
                body:user,
            }),
            invalidatesTags:['Users']
        })
    })

});

export const {
    useGetUsersQuery,
    useUpdateUserMutation

} = userApi;