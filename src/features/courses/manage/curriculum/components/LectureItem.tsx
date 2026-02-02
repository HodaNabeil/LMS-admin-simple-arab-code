import { useState } from "react";
import { FileText, ChevronDown, ChevronUp, Plus, X, PlayCircle, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lecture } from "@/types/curriculum";
import ManageFormLesson from "./ManageFormLesson";
import VideoUploadSelector from "./VideoUploadSelector";
import ResourceUploadSelector from "./ResourceUploadSelector";
import DeleteLecture from "./DeleteLecture";
import { LectureType } from "@/types/api.generated";

interface LectureItemProps {
    lecture: Lecture;
    index: number;
}

export default function LectureItem({ lecture, index }: LectureItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [showContentTypeSelector, setShowContentTypeSelector] = useState(false);
    const [selectedContentType, setSelectedContentType] = useState<"VIDEO" | "QUIZ" | "RESOURCES" | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isDownloadable, setIsDownloadable] = useState(false);
    const [resources, setResources] = useState([
        { id: 1, name: "9.pdf", size: "141.8 kB", type: "PDF" }
    ]);
    const [editingResourceId, setEditingResourceId] = useState<number | null>(null);
    const [isEditingInfo, setIsEditingInfo] = useState(false);

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
                                <FileText className="h-4 w-4 text-gray-400" />
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
                            {!showContentTypeSelector && !selectedContentType && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleSelector}
                                    className="border-[#3c45aa] text-[#3c45aa] hover:bg-[#3c45aa]/5 flex items-center gap-1 rounded-md h-8 text-xs font-bold"
                                >
                                    <Plus className="h-3 w-3" /> المحتوى
                                </Button>
                            )}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </button>
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
                            <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setSelectedContentType("VIDEO")}>
                                <div className="w-16 h-16 border border-gray-200 flex items-center justify-center bg-white group-hover:border-[#3c45aa] group-hover:shadow-sm transition-all relative overflow-hidden rounded-sm">
                                    <PlayCircle className="h-7 w-7 text-gray-300 group-hover:text-[#3c45aa]" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gray-100 text-[#374151] text-[9px] py-1 text-center font-bold">فيديو</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Content Form */}
            {selectedContentType === "VIDEO" && (
                <div className="border border-gray-200 mt-6 p-6 bg-white animate-in slide-in-from-top duration-300 relative rounded-sm">
                    {/* Tab Header for "Add Video" */}
                    <div className="absolute -top-[34px] left-0">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 border-b-0 rounded-t-sm relative z-10">
                            <button
                                onClick={() => setSelectedContentType(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors mr-2"
                            >
                                <X className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-bold text-gray-700">إضافة فيديو</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <VideoUploadSelector onFileSelect={handleVideoFileSelect} />
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6">
                        <h4 className="font-bold text-gray-700 mb-4 text-right">معلومات الفيديو</h4>
                        <ManageFormLesson
                            mode="edit"
                            lessonId={lecture.id}
                            type={LectureType.VIDEO}
                            hiddenFields={["title", "description"]}
                            initialValues={lecture}
                            onClose={() => {
                                setSelectedContentType(null);
                                setShowContentTypeSelector(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Resources / Description / Lab Section (Visible when Expanded) */}
            {isOpen && (
                <div className="border-t border-gray-100 bg-white">
                    {/* Video Content Overview (Visible when expanded and not in selection mode) */}
                    {!showContentTypeSelector && !selectedContentType && (
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                {/* Left side: Actions */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            onClick={() => setIsDownloadable(!isDownloadable)}
                                            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${isDownloadable ? 'bg-[#7c3aed]' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${isDownloadable ? 'translate-x-5' : 'translate-x-0'}`}></div>
                                        </div>
                                        <span className="text-sm text-gray-600 font-bold">قابل للتنزيل:</span>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                                            className="bg-[#7c3aed] text-white px-6 py-2 rounded-md flex items-center gap-2 text-sm font-bold hover:bg-[#6d28d9] transition-colors"
                                        >
                                            <ChevronDown className={`h-4 w-4 transition-transform ${isPreviewOpen ? 'rotate-180' : ''}`} />
                                            معاينة
                                        </button>

                                        {isPreviewOpen && (
                                            <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                                                <button className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-end gap-2">
                                                    كمحاضر
                                                </button>
                                                <button className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-end gap-2 border-t border-gray-100">
                                                    كطالب
                                                </button>
                                            </div>
                                        )}
                                    </div>


                                </div>

                                {/* Right side: Video Info */}
                                <div className="flex items-start gap-4">
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800 dir-ltr text-right">
                                                مقدمة ألعاب YouTube الهندسية - تم تصميمه باستخدام Clipchamp.mp4
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">00:10</span>
                                        <button
                                            onClick={() => setSelectedContentType("VIDEO")}
                                            className="text-[#7c3aed] text-sm font-bold hover:underline flex items-center gap-1"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            تحرير المحتوى
                                        </button>
                                    </div>
                                    <div className="w-24 h-14 bg-black rounded-sm flex items-center justify-center relative overflow-hidden">
                                        {/* Video preview placeholder */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Downloadable Materials List */}
                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <h4 className="text-sm font-bold text-gray-700 mb-4 text-right">مواد قابلة للتنزيل</h4>
                                <div className="flex flex-col gap-2">
                                    {resources.map((resource) => (
                                        <div key={resource.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 px-2 transition-colors group">
                                            <button
                                                onClick={() => setResources(resources.filter(r => r.id !== resource.id))}
                                                className="text-gray-300 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-500 font-medium">({resource.size})</span>
                                                <span className="text-sm text-gray-600 font-bold">{resource.name}</span>
                                                <FileText className="h-4 w-4 text-gray-400" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-gray-50/50 p-4">
                        {/* Resources Section */}
                        <div className="mb-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setSelectedContentType(selectedContentType === "RESOURCES" ? null : "RESOURCES")}
                                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-700">الموارد</span>
                                    <Plus className="h-4 w-4 text-[#7c3aed]" />
                                </div>
                                {selectedContentType === "RESOURCES" ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                            </button>

                            {selectedContentType === "RESOURCES" && (
                                <div className="p-4 border-t border-gray-100 bg-white">
                                    {!showContentTypeSelector ? (
                                        <div className="flex flex-col gap-3">
                                            {resources.map((resource) => (
                                                <div key={resource.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-md bg-white hover:border-[#7c3aed]/30 transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-[#f8f9fb] p-2 rounded-md group-hover:bg-[#7c3aed]/5">
                                                            <FileText className="h-5 w-5 text-gray-500 group-hover:text-[#7c3aed]" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-gray-700">{resource.name}</span>
                                                            <span className="text-[10px] text-gray-500">{resource.size} • {resource.type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="text-[#7c3aed] text-xs font-bold hover:underline"
                                                            onClick={() => {
                                                                setEditingResourceId(resource.id);
                                                                setShowContentTypeSelector(true);
                                                            }}
                                                        >
                                                            استبدال
                                                        </button>
                                                        <button
                                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                                            onClick={() => {
                                                                setResources(resources.filter(r => r.id !== resource.id));
                                                            }}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                onClick={() => {
                                                    setEditingResourceId(null);
                                                    setShowContentTypeSelector(true);
                                                }}
                                                className="mt-2 flex items-center justify-center gap-2 w-full py-3 border border-dashed border-gray-300 rounded-md text-gray-500 hover:text-[#7c3aed] hover:border-[#7c3aed] hover:bg-[#7c3aed]/5 transition-all"
                                            >
                                                <Plus className="h-4 w-4" />
                                                <span className="text-sm font-bold">إضافة مورد جديد</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="animate-in fade-in zoom-in-95 duration-200">
                                            <ResourceUploadSelector
                                                onResourceSelect={(resourceData: any) => {
                                                    if (editingResourceId) {
                                                        // Replace
                                                        setResources(resources.map(r => r.id === editingResourceId ? {
                                                            ...r,
                                                            name: resourceData.file?.name || "مورد محدث",
                                                            size: "1.0 MB", // Mock size
                                                            type: "UPDATED"
                                                        } : r));
                                                    } else {
                                                        // Add
                                                        setResources([...resources, {
                                                            id: Date.now(),
                                                            name: resourceData.file?.name || "مورد جديد",
                                                            size: "0.5 MB", // Mock size
                                                            type: "NEW"
                                                        }]);
                                                    }
                                                    setShowContentTypeSelector(false);
                                                    setEditingResourceId(null);
                                                }}
                                                onCancel={() => {
                                                    setShowContentTypeSelector(false);
                                                    setEditingResourceId(null);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>



                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <button className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-700">مختبر</span>
                                    <Plus className="h-4 w-4 text-[#7c3aed]" />
                                </div>
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
