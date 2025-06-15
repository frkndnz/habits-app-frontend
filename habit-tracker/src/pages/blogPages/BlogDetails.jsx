import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogPostsQuery } from "@/features/blogs/blogApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useGetBlogPostByIdQuery } from "../../features/blogs/blogApi";

const BlogDetails = () => {


  const { id } = useParams();
  const navigate = useNavigate();
  const{data,error,isLoading}=useGetBlogPostByIdQuery(id);
  

  const blogPost = data?.value;

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error || !blogPost) return <p>Blog bulunamadı.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-black"
      >
        ← Geri
      </Button>

      <Card className="p-6 shadow-lg space-y-6">
        <h1 className="text-4xl font-bold">{blogPost.title}</h1>

        <div className="text-sm text-gray-500 flex gap-4">
          <span>✍️ {blogPost.authorName || "Yazar Bilgisi Yok"}</span>
          <span>📅 {new Date(blogPost.createdAt).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</span>
        </div>

        {blogPost.imageUrl && (
          <img
            src={blogPost.imageUrl}
            alt={blogPost.title}
            className="w-full h-auto object-cover rounded-lg shadow"
          />
        )}

        
          <ReactMarkdown className="text-left prose prose-blue max-w-none">{blogPost.content}</ReactMarkdown>
        
      </Card>
    </div>
  );
};

export default BlogDetails;
