import { useState, useEffect } from "react";
import { useGetBlogPostsQuery, useDeleteBlogPostMutation } from "../../../features/blogs/blogApi";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Pagination } from "../../Pagination";


export const BlogList = () => {


    const navigate = useNavigate();
    const [deleteBlogPost] = useDeleteBlogPostMutation();

    const [rawSearchTerm, setRawSearchTerm] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 5;


    const { data, error, isLoading } = useGetBlogPostsQuery({
        searchTerm,
        page,
        pageSize
    });

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
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchTerm(rawSearchTerm);
        }, 500);

        return () => clearTimeout(handler);
    }, [rawSearchTerm])


    return (
        <>

            <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
                    <h2 className="text-lg sm:text-xl font-semibold">Blogs</h2>

                    <div className="flex flex-col sm:flex-row sm:items-center  w-full sm:w-fit  gap-2 sm:gap-4">
                        <button
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white text-sm sm:text-base"
                            onClick={() => navigate("/admin/blogs/create")}
                        >
                            Add Post
                        </button>

                        <input
                            type="text"
                            placeholder="Search"
                            maxLength={20}
                            value={rawSearchTerm}
                            onChange={handleSearchTermChange}
                            className="rounded-xl px-3 py-2 text-sm border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full sm:w-auto"
                        />
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
                            {data?.value?.blogPosts.map((post, index) => (
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
            <Pagination
                page={page}
                pageSize={pageSize}
                totalCount={data?.value?.totalCount ?? 0}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    )
};