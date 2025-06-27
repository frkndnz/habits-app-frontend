
import { User, Brain, FileText, MessageSquare } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { RecentItemList } from "../../components/admin/RecentItemList";
import { useGetDashboardQuery } from "../../features/admin/adminApi";

export default function Dashboard() {

  const { data, isLoading, isSuccess, error } = useGetDashboardQuery();

  if (isLoading)
    return <h2>Loading...</h2>

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={User} title="Total Users" value={data?.value?.totalUsers} />
      <StatCard icon={Brain} title="Total Habits" value={data?.value?.totalHabits} />
      <StatCard icon={FileText} title="Total Blogs" value={data?.value?.totalBlogs} />
      <StatCard icon={MessageSquare} title="Feedbacks" value={data?.value?.totalFeedbacks} />


      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <RecentItemList
          title="Recent Users"
          items={data?.value?.newUsers}
          renderItem={(user) => (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">{user.email}</span>
              <span className="text-xs text-gray-500">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <RecentItemList
          title="Recent Feedbacks"
          items={data?.value?.recentFeedbacks}
          renderItem={(fb) => (
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-800">{fb.subject}</p>
              <span className="text-xs text-gray-500 line-clamp-1">
                {fb.userEmail} • {new Date(fb.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        />
      </div>


      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <RecentItemList
          title="Recent Blogs"
          items={data?.value?.recentBlogs}
          renderItem={(blog) => (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">{blog.title}</span>
              <span className="text-xs text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        />
      </div>

    </div>
  )
}
