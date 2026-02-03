import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Plus, X, PlayCircle, CheckCircle2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lecture } from "@/types/curriculum";
import ManageFormLesson from "./ManageFormLesson";
import VideoUploadSelector, { type UploadStatus } from "./VideoUploadSelector";
import ResourceUploadSelector from "./ResourceUploadSelector";
import DeleteLecture from "./DeleteLecture";
import { LectureType, AttachmentType } from "@/types/api.generated";

interface LectureItemProps {
    lecture: Lecture;
    index: number;
}

export default function LectureItem({ lecture, index }: LectureItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showContentTypeSelector, setShowContentTypeSelector] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState<"VIDEO" | "QUIZ" | "RESOURCES" | null>(null);

    const [manageVideo, setManageVideo] = useState(false);
    const [resources, setResources] = useState(lecture.attachments?.map(a => ({
        id: a.id,
        name: a.name,
        size: a.fileSize ? `${(a.fileSize / 1024).toFixed(1)} kB` : "0 kB",
        type: a.type
    })) || []);
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("IDLE");



    const getFileName = (url?: string) => {
        if (!url) return "";
        try {
            const decoded = decodeURIComponent(url);
            return decoded.split('/').pop() || lecture.title;
        } catch {
            return lecture.title;
        }
    };

    const toggleSelector = () => {
        setShowContentTypeSelector(!showContentTypeSelector);
        setSelectedContentType(null);
    };

    const handleVideoFileSelect = (file: File) => {
        console.log("Selected video file:", file);
        // Here we can trigger the actual upload or update mutation

    };

    return (
        <div className="flex flex-col border border-gray-200 shadow-sm transition-all hover:shadow-md bg-white mb-2 overflow-hidden">
            {/* Editing UI (Creation Style) */}
            {isEditingInfo ? (
                <div className="p-4 bg-gray-50/30">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white relative">
                        <button
                            onClick={() => setIsEditingInfo(false)}
                            className="absolute top-2 left-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="mb-4 text-right">
                            <span className="text-sm font-bold text-gray-700">تعديل معلومات المحاضرة</span>
                        </div>

                        <ManageFormLesson
                            mode="edit"
                            lessonId={lecture.id}
                            type={lecture.type as LectureType}
                            initialValues={lecture}
                            hiddenFields={["type"]}
                            onClose={() => setIsEditingInfo(false)}
                        />
                    </div>
                </div>
            ) : (
                <>
                    {/* Top Row */}
                    <div className="flex items-center justify-between p-3">
                        {/* Right side (RTL Start) */}
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-4 w-4 text-gray-800" />
                            <div className="flex items-center gap-1 flex-1">
                                <span className="text-sm text-gray-700 font-bold whitespace-nowrap">محاضرة {index + 1}:</span>
                                {!isUploadingVideo && (
                                    lecture.type === LectureType.VIDEO ? (
                                        <PlayCircle className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <FileText className="h-4 w-4 text-gray-400" />
                                    )
                                )}
                                <span className="text-sm text-gray-600 truncate max-w-[200px]">{lecture.title}</span>
                            </div>
                            <div className="flex items-center gap-2 mr-4">
                                <button
                                    onClick={() => setIsEditingInfo(true)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                </button>
                                <DeleteLecture lectureId={lecture.id} lectureTitle={lecture.title} />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {!showContentTypeSelector && !selectedContentType && !lecture.videoUrl && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleSelector}
                                    className="border-[#3c45aa] text-[#3c45aa] hover:bg-[#3c45aa]/5 flex items-center gap-1 rounded-md h-8 text-xs font-bold"
                                >
                                    <Plus className="h-3 w-3" /> المحتوى
                                </Button>
                            )}


                            {
                                !showContentTypeSelector
                                && (!manageVideo || uploadStatus === "PROCESSING") && (
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </>
            )}



            {/* Content Selection Area */}
            {showContentTypeSelector && !selectedContentType && (
                <div className="border-t border-gray-100 p-4 bg-white relative">
                    <div className="flex items-center justify-between border border-gray-200 rounded-t-lg p-2 w-fit bg-white mb-[-1px] relative z-10 px-4 gap-4 border-b-white">
                        <span className="text-xs font-bold text-gray-600">حدد نوع المحتوى</span>
                        <button onClick={toggleSelector} className="text-gray-400 hover:text-gray-600">
                            <X className="h-3 w-3" />
                        </button>
                    </div>

                    <div className="border border-gray-200 rounded-b-lg rounded-tl-lg p-6 bg-white shadow-[0_0_10px_rgba(0,0,0,0.02)]">
                        <div className="bg-[#f8f9fb] text-[#3c45aa] text-[11px] p-3 rounded-md mb-6 flex items-center justify-center text-center">
                            <span>اختر نوع المحتوى الرئيسي. يمكن إضافة الملفات والروابط كموارد. <a href="#" className="underline font-bold">تعرّف على أنواع المحتوى.</a></span>
                        </div>

                        <div className="flex items-center justify-center gap-10">
                            {/* Option: Article */}
                            <div className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-16 h-16 border border-gray-200 flex items-center justify-center bg-white group-hover:border-[#3c45aa] group-hover:shadow-sm transition-all relative overflow-hidden rounded-sm">
                                    <FileText className="h-7 w-7 text-gray-300 group-hover:text-[#3c45aa]" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gray-100 text-[#374151] text-[9px] py-1 text-center font-bold">مقالة</div>
                                </div>
                            </div>

                            {/* Option: Video */}
                            <div
                                className="flex flex-col items-center gap-2 cursor-pointer group"
                                onClick={() => {
                                    setSelectedContentType("VIDEO");
                                    setManageVideo(true);
                                    setShowContentTypeSelector(false);
                                    setIsOpen(true);
                                }}
                            >
                                <div className="w-16 h-16 border border-gray-200 flex items-center justify-center bg-white group-hover:border-[#3c45aa] group-hover:shadow-sm transition-all relative overflow-hidden rounded-sm">
                                    <PlayCircle className="h-7 w-7 text-gray-300 group-hover:text-[#3c45aa]" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gray-100 text-[#374151] text-[9px] py-1 text-center font-bold">فيديو</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Resources / Description / Lab Section (Visible when Expanded) */}
            {isOpen && (
                <div className="border-t border-gray-100 bg-white p-4">
                    {/* Video Upload / Status Section */}
                    {(selectedContentType === "VIDEO" || lecture.videoUrl) && (
                        <div className="mb-6">
                            {selectedContentType === "VIDEO" && manageVideo && (
                                <div className="mb-4">
                                    <div className="flex justify-end">
                                        <div className="flex items-center justify-between border border-gray-200 rounded-t-lg p-2 w-fit bg-white mb-[-1px] relative z-10 px-4 gap-4 border-b-white">
                                            <span className="text-xs font-bold text-gray-600">إضافة فيديو</span>
                                            <button
                                                onClick={() => {
                                                    setSelectedContentType(null);
                                                    setManageVideo(false);
                                                }}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-b-lg rounded-tr-lg p-6 bg-white shadow-[0_0_10px_rgba(0,0,0,0.02)]">
                                        <VideoUploadSelector
                                            onFileSelect={handleVideoFileSelect}
                                            onStatusChange={(status) => {
                                                setIsUploadingVideo(status === "UPLOADING");
                                                if (status === "COMPLETED") {
                                                    setManageVideo(false);
                                                    setSelectedContentType(null);
                                                }
                                            }}
                                            uploadStatus={uploadStatus}
                                            setUploadStatus={setUploadStatus}
                                        />
                                    </div>
                                </div>
                            )}

                            {lecture.videoUrl && selectedContentType !== "VIDEO" && (
                                <div className="border border-gray-200 rounded-sm p-4 mb-4 bg-white shadow-sm overflow-hidden">
                                    <div className="flex flex-col w-full text-right dir-rtl">
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
                                                    <td className="p-3 text-gray-600 font-medium truncate max-w-0">{getFileName(lecture.videoUrl)}</td>
                                                    <td className="p-3 text-gray-500 text-center">Video</td>
                                                    <td className="p-3 text-center">
                                                        <span className="text-gray-600 font-bold">جارِ المعالجة</span>
                                                    </td>
                                                    <td className="p-3 text-gray-500 text-center">2026/02/03</td>
                                                    <td className="p-3 text-center">
                                                        <button
                                                            onClick={() => {
                                                                setSelectedContentType("VIDEO");
                                                                setManageVideo(true);
                                                                setIsOpen(true);
                                                            }}
                                                            className="text-[#7c3aed] font-bold hover:underline"
                                                        >
                                                            استبدال
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* Horizontal scrollbar placeholder */}
                                        <div className="bg-white p-1 border-t border-gray-100 flex items-center gap-2 h-6">
                                            <span className="text-[10px] text-gray-300">◀</span>
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                                            <span className="text-[10px] text-gray-300">▶</span>
                                        </div>
                                    </div>

                                    <p className="text-[11px] text-gray-600 font-medium text-right mt-4">
                                        <span className="font-bold">ملاحظة:</span> لا يزال video هذا قيد المعالجة. سنرسل إليك رسالة عبر البريد الإلكتروني عندما يكون جاهزًا.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Right-aligned buttons (Description, Resources, Lab) - Show after upload completes, during processing, or when not managing video */}
                    {(!showContentTypeSelector && (!manageVideo || uploadStatus === "PROCESSING" || uploadStatus === "COMPLETED")) && (
                        <div className="flex flex-col items-end gap-3 mt-4 w-full">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 rounded-xl flex items-center gap-3 w-40 font-bold px-4 py-6 border-2 justify-between"
                                dir="rtl"
                            >
                                <span className="flex-1 text-right">الوصف</span>
                                <Plus className="h-5 w-5" />
                            </Button>

                            <div className="w-full flex flex-col items-end">
                                <div className="flex flex-col items-end gap-4 w-full">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setSelectedContentType(selectedContentType === "RESOURCES" ? null : "RESOURCES")}
                                        className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 rounded-xl flex items-center gap-3 w-40 font-bold px-4 py-6 border-2 justify-between"
                                        dir="rtl"
                                    >
                                        <span className="flex-1 text-right">الموارد</span>
                                        <Plus className="h-5 w-5" />
                                    </Button>

                                    {selectedContentType === "RESOURCES" && (
                                        <div className="w-full mt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                                                {resources.length > 0 && (
                                                    <div className="flex flex-col gap-2 mb-4">
                                                        {resources.map((resource) => (
                                                            <div key={resource.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-white" dir="rtl">
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="h-5 w-5 text-gray-400" />
                                                                    <div className="flex flex-col items-start">
                                                                        <span className="text-sm font-bold text-gray-700">{resource.name}</span>
                                                                        <span className="text-[10px] text-gray-500">{resource.size}</span>
                                                                    </div>
                                                                </div>
                                                                <button onClick={() => setResources(resources.filter(r => r.id !== resource.id))} className="text-gray-400 hover:text-red-500">
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <ResourceUploadSelector
                                                    onResourceSelect={(data) => {
                                                        setResources([...resources, { id: Date.now().toString(), name: data.file.name, size: "1.0 MB", type: AttachmentType.OTHER }]);
                                                        setSelectedContentType(null);
                                                    }}
                                                    onCancel={() => setSelectedContentType(null)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 rounded-xl flex items-center gap-3 w-40 font-bold px-4 py-6 border-2 justify-between"
                                dir="rtl"
                            >
                                <span className="flex-1 text-right">مختبر</span>
                                <Plus className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
