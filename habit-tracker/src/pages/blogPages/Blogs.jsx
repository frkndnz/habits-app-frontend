import { Navigate, useNavigate } from "react-router-dom"
import { useGetBlogPostsQuery } from "../../features/blogs/blogApi"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "../../components/Pagination";
import { useState,useEffect } from "react";

export const Blogs = () => {


  const navigate = useNavigate();

  const [rawSearchTerm, setRawSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 2;


  const { data, error, isLoading } = useGetBlogPostsQuery({
    searchTerm,
    page,
    pageSize
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(rawSearchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [rawSearchTerm])

const handleSearchTermChange = (e) => {
    setRawSearchTerm(e.target.value);
    setPage(1);
  }



  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>Bir hata oluştu.</p>;







  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-white text-2xl font-bold">All Posts</h1>
        <input
          className="rounded-xl p-1 text-center  border-2 border-blue-300  focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
          type="text"
          placeholder="Search"
          maxLength={20}
          value={rawSearchTerm}
          onChange={handleSearchTermChange}

        ></input>
      </div>
      {data?.value?.blogPosts.map((post) => (
        <Card
          key={post.id}
          className="flex flex-col sm:flex-row bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] mb-8"
        >
          {/* Sol Bölüm: Yazı İçeriği */}
          <CardContent className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <CardTitle className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {post.title}
              </CardTitle>
              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-5 gap-y-2 gap-x-4">
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.268z"
                    />
                  </svg>
                  {post.creatorName || "Furkan Deniz"}
                </span>
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString( {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <CardDescription className="text-gray-700 text-lg leading-relaxed line-clamp-4">
                {post.shortDescription}
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate(`/blog/${post.id}`)}
              className="mt-8 px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 self-start"
            >
              Detayları Gör
            </Button>
          </CardContent>

          {/* Sağ Bölüm: Resim */}
          {post.imageUrl && (
            <div className="sm:w-2/5 md:w-1/2 lg:w-2/5 flex-shrink-0">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover rounded-t-xl sm:rounded-r-xl sm:rounded-tl-none shadow-md"
              />
            </div>
          )}
        </Card>
      ))}
      {data.value ==null &&(
        <h1 className="text-white text-xl font-sembold">Aradıgınızı bulamadık!</h1>
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