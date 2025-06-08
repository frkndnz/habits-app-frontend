import { baseApi } from "../baseApi";
import { habitApi } from "../habits/habitApi";

export const habitLogApi = baseApi.injectEndpoints({
    
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
            invalidatesTags: ["SummaryStats"],
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
            },
            invalidatesTags: ["SummaryStats"],
        }),
    })
});

export const {
    useGetHabitLogsQuery,
    useAddHabitLogMutation,
    useDeleteHabitLogMutation } = habitLogApi;