import {  useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; 
import { Pagination } from "../../components/Pagination";
import { useGetLogsQuery } from "../../features/admin/adminApi";



export default function Logs() {
    const [selectedLog, setSelectedLog] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data, error, isLoading } = useGetLogsQuery({
        page,
        pageSize
    });

    function openModal(log) {
        setSelectedLog(log);
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
        setSelectedLog(null);
    }

    return (
        <>

            <div className="p-8">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Logs</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">#</th>
                                <th className="p-2">Timestamp</th>
                                <th className="p-2">Level</th>
                                <th className="p-2">Message</th>
                                <th className="p-2">Exception</th>
                                <th className="p-2">Path</th>
                                <th className="p-2">Method</th>
                                <th className="p-2">User</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.value?.items?.map((log, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{(page - 1) * pageSize + index + 1}</td>
                                    <td className="p-2">{new Date(log.timeStamp).toLocaleString()}</td>
                                    <td className="p-2">{log.level}</td>
                                    <td className="p-2 max-w-xs truncate" title={log.message}>{log.message}</td>
                                    <td className="p-2 max-w-xs truncate text-red-600" title={log.exception}>{log.exception || "-"}</td>
                                    <td className="p-2">{log.path || "-"}</td>
                                    <td className="p-2">{log.method || "-"}</td>
                                    <td className="p-2">{log.user || "-"}</td>
                                    <td className="p-2">
                                        <Button size="sm" onClick={() => openModal(log)}>
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {data?.value?.items?.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="p-4 text-center text-gray-500">
                                        Log bulunamadı.
                                    </td>
                                </tr>
                            )}
                            {error && (
                                <tr>
                                    <td colSpan={9} className="p-4 text-center text-red-500">
                                        Loglar alınırken bir hata oluştu.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalCount={data?.value?.totalCount ?? 0}
                    onPageChange={(newPage) => setPage(newPage)}
                />

                {/* Modal */}
            <Dialog open={isOpen} onOpenChange={closeModal}>
    <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8 mx-auto bg-white dark:bg-gray-900">
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-lg sm:text-xl font-semibold">Log Details</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                Ayrıntılı log bilgileri
            </DialogDescription>
        </DialogHeader>

        {selectedLog && (
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] py-4">
                <div className="space-y-4">
                    {/* Timestamp */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 sm:col-span-1">
                            Timestamp:
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 sm:col-span-3 break-words">
                            {new Date(selectedLog.timeStamp).toLocaleString()}
                        </div>
                    </div>

                    {/* Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 sm:col-span-1">
                            Level:
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 sm:col-span-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                selectedLog.level === 'Error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                selectedLog.level === 'Warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                selectedLog.level === 'Info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                                {selectedLog.level}
                            </span>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Message:
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 break-words whitespace-pre-wrap">
                            {selectedLog.message}
                        </div>
                    </div>

                    {/* Exception */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Exception:
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-900 rounded p-3 max-h-60 overflow-y-auto">
                            <pre className="text-xs sm:text-sm text-red-600 dark:text-red-400 whitespace-pre-wrap break-words font-mono">
                                {selectedLog.exception || "-"}
                            </pre>
                        </div>
                    </div>

                    {/* Path */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 sm:col-span-1">
                            Path:
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 sm:col-span-3 break-all font-mono">
                            {selectedLog.path || "-"}
                        </div>
                    </div>

                    {/* Method */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 sm:col-span-1">
                            Method:
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 sm:col-span-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded text-xs font-medium">
                                {selectedLog.method || "-"}
                            </span>
                        </div>
                    </div>

                    {/* User */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="font-semibold text-gray-700 dark:text-gray-300 sm:col-span-1">
                            User:
                        </div>
                        <div className="text-sm text-gray-900 dark:text-gray-100 sm:col-span-3 break-words">
                            {selectedLog.user || "-"}
                        </div>
                    </div>
                </div>
            </div>
        )}

        <DialogFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={closeModal} className="w-full sm:w-auto">
                Close
            </Button>
        </DialogFooter>
    </DialogContent>
</Dialog>
            </div>

        </>
    );


}
