import { useState, useRef } from "react";
import { Library, X } from "lucide-react";

interface VideoUploadSelectorProps {
    onFileSelect: (file: File) => void;
}

type UploadStatus = "IDLE" | "UPLOADING" | "PROCESSING" | "COMPLETED";

interface FileInfo {
    name: string;
    type: string;
    status: string;
    uploadDate: string;
}

export default function VideoUploadSelector({ onFileSelect }: VideoUploadSelectorProps) {
    const [activeTab, setActiveTab] = useState<"UPLOAD" | "LIBRARY">("UPLOAD");
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("IDLE");
    const [progress, setProgress] = useState(0);
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const now = new Date();
            const dateString = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`;

            setFileInfo({
                name: file.name,
                type: "Video",
                status: "0%",
                uploadDate: dateString
            });
            setUploadStatus("UPLOADING");
            setProgress(0);
            onFileSelect(file);

            // Simulate upload progress
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.floor(Math.random() * 15) + 5;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        setUploadStatus("PROCESSING");
                    }, 800);
                }
                setProgress(currentProgress);
            }, 400);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleCancel = () => {
        setUploadStatus("IDLE");
        setFileInfo(null);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col w-full bg-white dir-rtl text-right">
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-gray-100 mb-6 relative">
                <button
                    onClick={() => setActiveTab("UPLOAD")}
                    className={`pb-2 text-sm font-bold transition-all relative ${activeTab === "UPLOAD"
                        ? "text-slate-800 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-slate-800"
                        : "text-gray-400 hover:text-gray-600"
                        }`}
                >
                    تحميل فيديو
                </button>

            </div>

            {/* Tab Content */}
            {activeTab === "UPLOAD" && (
                <div className="flex flex-col w-full">
                    {uploadStatus === "IDLE" ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4 w-full">
                                <div
                                    className="flex-1 border border-[#7c3aed] rounded-md p-3 h-12 flex items-center justify-end bg-white"
                                >
                                    <span className="text-gray-500 text-sm">
                                        لا توجد ملفات محددة
                                    </span>
                                </div>

                                <input
                                    type="button"
                                    value="اختيار الفيديو"
                                    accept=".avi,.mpg,.mpeg,.flv,.mov,.m2v,.m4v,.mp4,.rm,.ram,.vob,.ogv,.webm,.wmv"
                                    onClick={triggerFileInput}
                                    className="h-12 border border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 px-8 font-bold rounded-md cursor-pointer"
                                />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="video/*"
                                    className="hidden"
                                />
                            </div>

                            <p className="text-[11px] text-gray-500 font-medium text-right">
                                <span className="font-bold">ملاحظة:</span> يجب أن تكون جميع الملفات بدقة 720 بكسل على الأقل وأقل من 4.0 جيجابايت.
                            </p>
                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded-sm overflow-hidden mb-4">
                            <table className="w-full text-right text-xs">
                                <thead className="bg-[#f8f9fb] border-b border-gray-100">
                                    <tr>
                                        <th className="p-3 font-bold text-gray-700 w-[40%]">اسم الملف</th>
                                        <th className="p-3 font-bold text-gray-700 text-center">النوع</th>
                                        <th className="p-3 font-bold text-gray-700 text-center">الحالة</th>
                                        <th className="p-3 font-bold text-gray-700 text-center">التاريخ</th>
                                        <th className="p-3 font-bold text-gray-700 w-16"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100 last:border-0 h-16">
                                        <td className="p-3 text-gray-600 font-medium truncate max-w-0">{fileInfo?.name}</td>
                                        <td className="p-3 text-gray-500 text-center">{fileInfo?.type}</td>
                                        <td className="p-3 text-center">
                                            {uploadStatus === "UPLOADING" ? (
                                                <div className="flex items-center justify-center gap-2 min-w-[120px]">
                                                    <span className="text-[10px] text-gray-500 w-8 text-left">{progress}%</span>
                                                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#7c3aed] transition-all duration-300"
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-600 font-bold">جارِ المعالجة</span>
                                            )}
                                        </td>
                                        <td className="p-3 text-gray-500 text-center">{fileInfo?.uploadDate}</td>
                                        <td className="p-3 text-center">
                                            {uploadStatus === "UPLOADING" ? (
                                                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            ) : (
                                                <button onClick={() => setUploadStatus("IDLE")} className="text-[#7c3aed] font-bold hover:underline">
                                                    استبدال
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Horizontal scrollbar placeholder like in the image */}
                            <div className="bg-white p-1 border-t border-gray-100 flex items-center gap-2 h-6">
                                <span className="text-[10px] text-gray-300">◀</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                                <span className="text-[10px] text-gray-300">▶</span>
                            </div>
                        </div>
                    )}

                    {uploadStatus === "PROCESSING" && (
                        <p className="text-[11px] text-gray-600 font-medium text-right mt-2">
                            <span className="font-bold">ملاحظة:</span> لا يزال video هذا قيد المعالجة. سنرسل إليك رسالة عبر البريد الإلكتروني عندما يكون جاهزًا.
                        </p>
                    )}
                </div>
            )}

            {activeTab === "LIBRARY" && (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                    <Library className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-sm font-medium">المكتبة فارغة حالياً</p>
                </div>
            )}
        </div>
    );
}
