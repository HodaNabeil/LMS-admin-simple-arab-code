import { useState, useRef } from "react";
import { Library, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceUploadSelectorProps {
    onResourceSelect: (resource: any) => void;
    onCancel: () => void;
}

type TabType = "DOWNLOAD" | "LIBRARY" | "EXTERNAL" | "CODE";

export default function ResourceUploadSelector({ onResourceSelect, onCancel }: ResourceUploadSelectorProps) {
    const [activeTab, setActiveTab] = useState<TabType>("DOWNLOAD");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onResourceSelect({ type: 'FILE', file });
        }
    };

    return (
        <div className="flex flex-col w-full bg-white dir-rtl text-right border border-gray-200 rounded-lg overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex items-center justify-between px-4 pt-4 border-b border-gray-100">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab("DOWNLOAD")}
                        className={`pb-3 text-sm font-bold transition-all relative ${activeTab === "DOWNLOAD"
                            ? "text-[#3c45aa] after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#3c45aa]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        ملف قابل للتنزيل
                    </button>

                </div>
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 mb-2">
                    <X className="h-4 w-4" />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 bg-white min-h-[200px]">
                {activeTab === "DOWNLOAD" && (
                    <div className="flex flex-col gap-4">
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
                                value="اختيار ملف"
                                onClick={() => fileInputRef.current?.click()}
                                className="h-12 border border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/5 px-8 font-bold rounded-md cursor-pointer"
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium text-right mt-2">
                            <span className="font-bold">ملاحظة:</span> المورد هو أي نوع من المستندات التي يمكن استخدامها لمساعدة الطلاب في المحاضرة. سيُعد هذا الملف كمادة إضافية للمحاضرة. تأكد من أن كل شيء مقروء وحجم الملف أقل من 1 جيجابايت.
                        </p>
                    </div>
                )}



                {activeTab === "EXTERNAL" && (
                    <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700">العنوان</label>
                            <input type="text" className="border border-gray-200 rounded-md p-2 text-right" placeholder="أدخل عنوان المورد" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700">الرابط (URL)</label>
                            <div className="flex gap-2">
                                <input type="text" className="flex-1 border border-gray-200 rounded-md p-2 text-left bg-gray-50" placeholder="https://example.com" />
                            </div>
                        </div>
                        <Button className="mt-2 text-white bg-[#3c45aa] hover:bg-[#3c45aa]/90">إضافة المورد</Button>
                    </div>
                )}


            </div>
        </div>
    );
}
