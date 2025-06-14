import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export const BlogCreate=()=>{

    const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  

  const handleSubmit=()=>{

  }
    return(
      <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Yeni Blog Yazısı Oluştur</h1>

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

      {/* Content - Markdown Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="prose max-w-none border border-gray-300 rounded p-4 overflow-auto h-[360px] bg-white text-gray-800">
            <ReactMarkdown>{formData.content || "Markdown içeriğiniz burada görünecek..."}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Kaydet
      </button>
    </div>
    )
}