import React, { useState, useRef, useEffect } from 'react';
import { useSendPromtGeminiMutation } from '../features/ai/aiApi';




const GeminiChat = () => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const messagesEndRef = useRef(null);
    const [sendPrompt] = useSendPromtGeminiMutation();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([
                {
                    text: "Merhaba! Alışkanlıklar ve kişisel gelişim hakkında size nasıl yardımcı olabilirim?",
                    sender: "bot",
                },
            ]);
        }
    }, [isOpen, messages.length]);

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setError('');
        setLoading(true);

        try {
            const response = await sendPrompt({prompt:input}).unwrap();
            const geminiResponse = response?.value?.content || "Boş cevap geldi.";

            setMessages((prev) => [...prev, { text: geminiResponse, sender: 'bot' }]);
        } catch (err) {
            const errorMsg = err?.message || "Bilinmeyen bir hata oluştu.";
            setError(errorMsg);
            setMessages((prev) => [
                ...prev,
                { text: "Bir hata oluştu, lütfen daha sonra tekrar deneyin.", sender: 'bot', isError: true },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
                    aria-label="Sohbeti Aç"
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-gray-200">
                    {/* Header */}
                    <header className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                        <h2 className="text-lg font-semibold">AI Alışkanlık Asistanı</h2>
                        <button onClick={() => setIsOpen(false)} aria-label="Kapat">✖</button>
                    </header>

                    {/* Chat alanı */}
                    <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-3">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] p-3 rounded-lg text-sm shadow-sm
                  ${msg.sender === 'user' ? 'bg-blue-500 text-white' :
                                        msg.isError ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-200 text-gray-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="max-w-[75%] p-3 rounded-lg bg-gray-200 text-gray-800 animate-pulse">
                                    Yazıyor...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Hata */}
                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 text-sm mx-3 my-1 rounded">
                            Hata: {error}
                        </div>
                    )}

                    {/* Giriş */}
                    <form onSubmit={handleSendMessage} className="p-3 flex gap-2 border-t">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Mesaj yazın..."
                            className="flex-1 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-blue-500 text-sm"
                            rows={1}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
                        >
                            Gönder
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default GeminiChat;