
import { useState } from "react";
import { useGetFeedbacksQuery } from "../../features/feedbacks/feedbackApi";
import { Pagination } from "../../components/Pagination";




export const AdminFeedbackPage=()=> {


    const [page, setPage] = useState(1);
       const pageSize = 5;

  const { data, isLoading, error } = useGetFeedbacksQuery({
        page,
        pageSize
    });


  const feedbacks = data?.value?.feedbacks || [];




  
  if (isLoading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load feedbacks.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Feedbacks</h1>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600">No feedbacks found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl p-4">
          <table className="min-w-full text-sm table-auto">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2 pr-4">Subject</th>
                <th className="py-2 pr-4">Message</th>
                <th className="py-2 pr-4">User</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr
                  key={fb.id}
                  className="border-b hover:bg-gray-50 transition-colors text-left"
                >
                  <td className="py-2 pr-4 font-medium text-gray-800">{fb.subject}</td>
                  <td className="py-2 pr-4 text-gray-600 max-w-xs truncate">{fb.message}</td>
                  <td className="py-2 pr-4 text-gray-700">{fb.createUserName}</td>
                  <td className="py-2 pr-4 text-gray-500">{fb.createdUserEmail}</td>
                  <td className="py-2 text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
                      page={page}
                      pageSize={pageSize}
                      totalCount={data?.value?.totalCount ?? 0}
                      onPageChange={(newPage) => setPage(newPage)}
                    />
    </div>
  );
}
