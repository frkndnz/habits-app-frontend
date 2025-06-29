
import { User, Brain, FileText, MessageSquare,Bug ,Activity,Zap,Server,AlertTriangle,UserX } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { RecentItemList } from "../../components/admin/RecentItemList";
import { useGetDashboardQuery, useGetLogsSummaryQuery } from "../../features/admin/adminApi";

export default function Dashboard() {

  const { data, isLoading, isSuccess, error } = useGetDashboardQuery();
  const { data: logsSummary } = useGetLogsSummaryQuery();
  if (isLoading)
    return <h2>Loading...</h2>

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Genel İstatistikler */}
  <StatCard icon={User} title="Total Users" value={data?.value?.totalUsers} />
  <StatCard icon={Brain} title="Total Habits" value={data?.value?.totalHabits} />
  <StatCard icon={FileText} title="Total Blogs" value={data?.value?.totalBlogs} />
  <StatCard icon={MessageSquare} title="Feedbacks" value={data?.value?.totalFeedbacks} />

  {/* Hata İstatistikleri Başlığı */}
  <div className="col-span-full mt-4">
    <h2 className="text-lg font-semibold text-gray-700">Error Logs Summary</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">

      <StatCard icon={Bug} title="Total Error Count" value={logsSummary?.value?.totalErrorCount} />
      <StatCard icon={Activity} title="Today's Errors" value={logsSummary?.value?.todayErrorCount} />
      <StatCard icon={Zap} title="Most Failing Endpoint" value={logsSummary?.value?.mostFailingEndpoint} />
      <StatCard icon={AlertTriangle} title="Most Common Exception" value={logsSummary?.value?.mostCommonException} />
      <StatCard icon={UserX} title="Most Failing User" value={logsSummary?.value?.mostFailingUser} />
    </div>
  </div>

  {/* Recent Users */}
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

  {/* Recent Feedbacks */}
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

  {/* Recent Blogs */}
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
