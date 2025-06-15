import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAddBlogPostMutation, useGetBlogPostsQuery ,useUpdateBlogPostMutation} from "../../../features/blogs/blogApi";





export const BlogCreate = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { data, error } = useGetBlogPostsQuery(undefined, { skip: !isEdit });

  const [imageUrl, setImageUrl] = useState(null);

  const [addBlogPost] = useAddBlogPostMutation();
  const [updateBlogPost]=useUpdateBlogPostMutation();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (isEdit && data?.value) {
      const blogPost = data.value.find((p) => p.id === id);
      if (blogPost) {
        setFormData({
          title: blogPost.title,
          shortDescription: blogPost.shortDescription,
          content: blogPost.content,
          image: null, // file olarak yok
        });
        setImageUrl(blogPost.imageUrl); // gelen URL burada
      }
    }
  }, [isEdit, data]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("shortDescription", formData.shortDescription);
    formDataToSend.append("content", formData.content);
    
    if(formData.image){
      
      formDataToSend.append("image", formData.image);
    }
    
    if(isEdit){
     
      await updateBlogPost({id,blogPost:formDataToSend}).unwrap();
    }
    else{
      
      await addBlogPost(formDataToSend).unwrap();
    }
    navigate("/admin/blogs");

  }


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">{isEdit ? "Blog Yazını Güncelle" :"Yeni Blog Yazısı Oluştur"}</h1>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="title">
            Başlık
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Blog başlığı"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="shortDescription">
            Kısa Açıklama
          </label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Kısa açıklama"
            value={formData.shortDescription}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">
          📷 Fotoğraf Yükle
        </label>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-100 border border-gray-300 p-4 rounded-lg">
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-600 file:text-white
          hover:file:bg-blue-700
          transition duration-200"
          />

          {formData.image ? (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border shadow-sm"
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="Mevcut Görsel"
              className="w-32 h-32 object-cover rounded border shadow-sm"
            />
          ) : null}
        </div>

        {/* Content - Markdown Editor */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="content">
              İçerik (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              rows={15}
              className="w-full border border-gray-300 rounded px-3 py-2 font-mono"
              placeholder="Markdown formatında içeriği buraya yazın..."
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          {/* Preview */}
          <div>
            <label className="block mb-1 font-semibold">Önizleme</label>
            <div className="prose max-w-none border border-gray-300  rounded p-4 overflow-auto h-[360px] bg-white text-gray-800">
              <ReactMarkdown className="text-left">{formData.content || "Markdown içeriğiniz burada görünecek..."}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4">
          <button
          type="button"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={()=>navigate(-1)}
          >
          İptal
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          
          >
          Kaydet
        </button>
          </div>
      </div>
    </form>
  )
}