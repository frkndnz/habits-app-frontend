import { baseApi } from "../baseApi";

export const usersApi = baseApi.injectEndpoints({
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
        getUserProfile:builder.query({
            query:()=>'users/profile',
            providesTags: ['UserProfile'],
            
        }),
        updateUser:builder.mutation({
            query:(user)=>({
                url:`/users/${user.id}`,
                method:'PUT',
                body:user,
            }),
            invalidatesTags:['Users']
        }),
        updateUserProfile:builder.mutation({
            query:(user)=>({
                url:`/users/profile/${user.id}`,
                method:'PUT',
                body:user,
            }),
            invalidatesTags:['UserProfile']
        })
    })

});

export const {
    useGetUsersQuery,
    useGetUserProfileQuery,
    useUpdateUserMutation,
    useUpdateUserProfileMutation
    

} = usersApi;