import { useGetBlogPostsQuery } from "../../features/blogs/blogApi";
import { User } from "lucide-react";
import {Link} from "react-router-dom";

const  RecommendedReads = () => {

    const {data,isLoading}=useGetBlogPostsQuery({
        page:1,
        pageSize:3,
        searchTerm:'',
    });

    const posts=data?.value?.blogPosts;
    
    if (isLoading) return <p className="text-muted-foreground">Loading recommendations...</p>;
    return (
         <section className="mt-12">
      <h2 className=" text-xl sm:text-2xl font-bold mb-6 text-white">
        Recommended Reads to Improve Your Habits
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
          >
            {/* Thumbnail */}
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-40 object-fill rounded-md mb-4"
              />
            )}

            {/* Title */}
            <h3 className="font-semibold text-lg mb-2">{post.title}</h3>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              {post.shortDescription}
            </p>

            {/* Creator Info */}
            <div className="flex items-center mb-4 text-gray-600 text-sm space-x-2">
              <User className="w-4 h-4" />
              <span>{post.creatorName || "Unknown author"}</span>
            </div>

            {/* Read More Link */}
            <Link
              to={`/blog/${post.id}`}
              className="mt-auto text-teal-600 font-medium text-sm hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </section>
    );
}
export default RecommendedReads;