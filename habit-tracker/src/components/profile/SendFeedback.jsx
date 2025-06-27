import { useState } from "react";
import { useAddFeedbackMutation } from "../../features/feedbacks/feedbackApi";

export const SendFeedback = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);

    const [addFeedback, { isLoading, isSuccess, isError }] = useAddFeedbackMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject || !message) return;
        try {
            await addFeedback({ message, subject }).unwrap();
            setSubject("");
            setMessage("");
            setStatus("success");
        } catch (error) {
            console.error("Feedback error:", error);
            setStatus("error");
        }
    }


    return (
        <div className="bg-white p-6 rounded-xl shadow mt-10 max-w-2xl w-full mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Send Feedback</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md  border-gray-300 border-2   shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 text-sm"
                >
                    {isLoading ? "Sending..." : "Submit Feedback"}
                </button>

                {status === "success" && (
                    <p className="text-green-600 text-sm mt-2">Thank you for your feedback!</p>
                )}
                {status === "error" && (
                    <p className="text-red-600 text-sm mt-2">Failed to send. Please try again.</p>
                )}
            </form>
        </div>
    )
}