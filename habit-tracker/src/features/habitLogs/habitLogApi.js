import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { habitApi } from "../habits/habitApi";

export const habitLogApi = createApi({
    reducerPath: 'habitLogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7201/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getHabitLogs: builder.query({
            query: () => 'habitLogs',
            transformResponse: (response) => {
                return {
                    value: response.value,
                    isSuccess: response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                };
            },
            providesTags: ['HabitLogs'],
        }),
        addHabitLog: builder.mutation({
            query: (habitLog) => ({
                url: 'habitLogs',
                method: 'POST',
                body: habitLog,
            }),
            transformResponse: (response) => {
                return {
                    value: response.value,
                    isSuccess: response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                };
            },
            async onQueryStarted(habitLog, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.isSuccess) {
                        dispatch(habitApi.util.updateQueryData('getHabits', undefined, (draft) => {
                            const index = draft.value.findIndex(h => h.id === habitLog.habitId);
                            if (index !== -1) {
                                draft.value[index].isCompletedToday = true;
                            }
                        }));
                    }
                } catch (error) {
                    console.error('Update failed:', error);
                }
            }
        }),
        deleteHabitLog: builder.mutation({
            query: ({ habitId, date }) => ({
                url: `habitLogs?habitId=${habitId}&date=${encodeURIComponent(date)}`,
                method: 'DELETE',

            }),
            transformResponse: (response) => {
                return {
                    value: response.value,
                    isSuccess: response.isSuccess,
                    errorMessages: response.errorMessages,
                    message: response.message,
                };
            },
            async onQueryStarted({ habitId, date }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.isSuccess) {
                        dispatch(habitApi.util.updateQueryData('getHabits', undefined, (draft) => {
                            const index = draft.value.findIndex(h => h.id === habitId);
                            if (index !== -1) {
                                draft.value[index].isCompletedToday = false;
                            }
                        }));
                    }
                } catch (error) {
                    console.error('Update failed:', error);
                }
            }
        }),
    })
});

export const {
    useGetHabitLogsQuery,
    useAddHabitLogMutation,
    useDeleteHabitLogMutation } = habitLogApi;