import { useState ,useEffect} from "react";
import { useGetBlogPostsQuery,useDeleteBlogPostMutation } from "../../../features/blogs/blogApi";
import { Pencil, Trash } from "lucide-react";
import {  useNavigate } from "react-router-dom";



export const BlogList = () => {


    const navigate=useNavigate();
    const { data, error, isLoading } = useGetBlogPostsQuery();
    const [deleteBlogPost]=useDeleteBlogPostMutation();

    const [rawSearchTerm, setRawSearchTerm] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const handleEditClick = (postId) => {
        
        navigate(`/admin/blogs/edit/${postId}`);
        
      }
    
     
    
      function handleDelete(id) {
        if (confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) {
            deleteBlogPost(id).unwrap();
        }
      }
      const handleSearchTermChange = (e) => {
        setRawSearchTerm(e.target.value);
        setPage(1);
      }
      useEffect(()=>{
        const handler=setTimeout(() => {
          setSearchTerm(rawSearchTerm);
        }, 500);
    
        return()=> clearTimeout(handler);
      },[rawSearchTerm])


    return (
        <div className="p-8">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold ">Blogs</h2>
                <div className="flex gap-6">
                <button className=" rounded-lg bg-blue-400 p-2 text-white"
                        onClick={()=>navigate("/admin/blogs/create")}>
                    Add Post
                </button>
                <input
                    className="rounded-xl p-1 text-center  border-2 border-blue-300  focus:border-blue-500 focus:ring-blue-500 bg-white text-gray-900"
                    type="text"
                    placeholder="Search"
                    maxLength={20}
                    value={rawSearchTerm}
                    onChange={handleSearchTermChange}
                    
                    ></input>
                    </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full  text-sm">
                    <thead>
                        <tr className="border-b ">
                            <th className="p-2">ID</th>
                            <th className="p-2">Title</th>
                            <th className="p-2">Short Description</th>
                            <th className="p-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.value?.map((post, index) => (
                            <tr key={post.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">{post.title}</td>
                                <td className="p-2">{post.shortDescription}</td>
                                <td className="p-2 flex justify-center gap-4">
                                    <button className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={() => handleEditClick(post.id)}
                                    >
                                        <Pencil size={20} />
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline cursor-pointer"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        <Trash size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {error && (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-gray-500">
                                    Post bulunamadı!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
};