import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, FileText, FileVideo, Plus, CheckCircle, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// مكون رفع فيديو بسيط بدون react-hook-form
function SimpleVideoUpload({ value, onChange }: { value?: File | null; onChange: (file: File | null) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={e => {
          const file = e.target.files?.[0] || null;
          onChange(file);
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        className="border-gray-300"
      >
        <FileVideo className="w-4 h-4 ml-1" /> رفع فيديو
      </Button>
      {value && <span className="text-xs text-green-700 flex items-center gap-1">{value.name}</span>}
      {value && (
        <Button type="button" size="icon" variant="ghost" onClick={() => onChange(null)} className="text-red-500">
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

interface Lesson {
  id: string;
  name: string;
  video?: File | null;
}

interface Section {
  id: string;
  name: string;
  description?: string;
  lessons: Lesson[];
}

function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export default function Curriculum() {
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [lessonNames, setLessonNames] = useState<Record<string, string>>({});
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonEditValue, setLessonEditValue] = useState("");
  const [showContent, setShowContent] = useState<Record<string, boolean>>({});
  const [showSectionModal, setShowSectionModal] = useState(false);
  const sectionInputRef = useRef<HTMLInputElement>(null);
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionModalMode, setSectionModalMode] = useState<'add' | 'edit'>("add");
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  // إضافة قسم جديد
  const handleAddOrEditSection = () => {
    if (!sectionName.trim()) return;
    if (sectionModalMode === "add") {
      setSections([
        ...sections,
        { id: randomId(), name: sectionName, description: sectionDescription, lessons: [] },
      ]);
    } else if (sectionModalMode === "edit" && editingSection) {
      setSections(sections.map(s =>
        s.id === editingSection.id
          ? { ...s, name: sectionName, description: sectionDescription }
          : s
      ));
    }
    setSectionName("");
    setSectionDescription("");
    setEditingSection(null);
    setShowSectionModal(false);
  };

  // حذف قسم
  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter((s) => s.id !== sectionId));
  };

  // بدء تعديل قسم
  const handleStartEditSection = (section: Section) => {
    setSectionModalMode("edit");
    setEditingSection(section);
    setSectionName(section.name);
    setSectionDescription(section.description || "");
    setShowSectionModal(true);
  };

  // حفظ تعديل القسم
  // لم يعد هناك حاجة لهذا المنطق، التعديل يتم من خلال المودال

  // بدء تعديل وصف القسم
  const handleStartEditSectionDescription = (section: Section) => {
    setSectionModalMode("edit");
    setEditingSection(section);
    setSectionName(section.name);
    setSectionDescription(section.description || "");
    setShowSectionModal(true);
  };

  // حفظ تعديل وصف القسم
  // لم يعد هناك حاجة لهذا المنطق، التعديل يتم من خلال المودال

  // إضافة درس لقسم
  const handleAddLesson = (sectionId: string) => {
    const name = lessonNames[sectionId]?.trim();
    if (!name) return;
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: [
                ...s.lessons,
                { id: randomId(), name, video: null },
              ],
            }
          : s
      )
    );
    setLessonNames({ ...lessonNames, [sectionId]: "" });
  };

  // حذف درس
  const handleDeleteLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, lessons: s.lessons.filter((l) => l.id !== lessonId) }
          : s
      )
    );
  };

  // بدء تعديل درس
  const handleStartEditLesson = (lesson: Lesson) => {
    setEditingLessonId(lesson.id);
    setLessonEditValue(lesson.name);
  };

  // حفظ تعديل الدرس
  const handleSaveEditLesson = (sectionId: string, lessonId: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) =>
                l.id === lessonId ? { ...l, name: lessonEditValue } : l
              ),
            }
          : s
      )
    );
    setEditingLessonId(null);
    setLessonEditValue("");
  };

  // رفع فيديو للدرس
  const handleUploadVideo = (
    sectionId: string,
    lessonId: string,
    file: File | null
  ) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.map((l) =>
                l.id === lessonId ? { ...l, video: file } : l
              ),
            }
          : s
      )
    );
  };

  // إظهار/إخفاء محتوى الدرس (رفع الفيديو)
  const handleToggleContent = (lessonId: string) => {
    setShowContent((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  return (
    <div className=" flex flex-col items-center  h-[calc(100vh-200px)] bg-gray-50 p-8 ">
      <h2 className="text-xl font-bold mb-8 text-[#3c45aa] self-start text-right">مقرر الدورة</h2>
      <div className="space-y-8 w-full ">
        {sections.map((section, idx) => (
          <div
            key={section.id}
            className="bg-[#f7f7f9] rounded-xl p-6 shadow space-y-4 border border-gray-200"
          >
        <div>
        <div className="flex items-center gap-2 mb-4 ">
              <span className="font-bold text-lg text-[#1a237e]">القسم {idx + 1} :</span>
              <FileText className="w-5 h-5 text-[#1a237e]/80" />
              <span className="text-base text-gray-900">{section.name}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleStartEditSection(section)}
                className="text-gray-700"
                title="تعديل القسم"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteSection(section.id)}
                className="text-red-400 hover:text-red-600"
                title="حذف القسم"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

                </div>

              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor={`sectionDescription-${section.id}`}>وصف القسم</Label>
                <span className="text-sm text-gray-500">{section.description || "لا يوجد وصف"}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStartEditSectionDescription(section)}
                  className="text-gray-700"
                  title="تعديل وصف القسم"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>

         


            </div>
            {/* الدروس */}
            <div className="space-y-4 mr-8">
              {section.lessons.map((lesson, lidx) => (
                <div
                  key={lesson.id}
                  className="bg-[#e5e5ea] rounded-lg p-4 flex flex-col gap-2 border border-gray-100"
                >
                  <div className="flex items-center gap-2 ">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-[#1a237e]">:الدرس {lidx + 1}</span>
                    <FileText className="w-4 h-4 text-[#1a237e]/80" />
                    {editingLessonId === lesson.id ? (
                      <input
                    className="  border border-gray-300 rounded-lg px-4 py-2 text-base
                   bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7]
                    transition-all duration-150 shadow-sm"
                        value={lessonEditValue}
                        onChange={e => setLessonEditValue(e.target.value)}
                        onBlur={() => handleSaveEditLesson(section.id, lesson.id)}
                        onKeyDown={e => { if (e.key === "Enter") handleSaveEditLesson(section.id, lesson.id); }}
                        autoFocus
                      />
                    ) : (
                      <span className="text-base text-gray-900">{lesson.name}</span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleStartEditLesson(lesson)}
                      className="text-gray-700"
                      title="تعديل الدرس"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteLesson(section.id, lesson.id)}
                      className="text-red-400 hover:text-red-600"
                      title="حذف الدرس"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="flex-1" />
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-[#f7f7f9] border-gray-300 text-[#1a237e] px-4"
                      onClick={() => handleToggleContent(lesson.id)}
                    >
                      <Plus className="w-4 h-4 ml-1" /> محتوى
                    </Button>
                  </div>
                  {/* رفع فيديو عند الضغط على Content */}
                  {showContent[lesson.id] && (
                    <div className="flex items-center gap-4 mt-4 flex-row-reverse">
                      <SimpleVideoUpload
                        value={lesson.video}
                        onChange={file => handleUploadVideo(section.id, lesson.id, file)}
                      />
                    </div>
                  )}
                </div>
              ))}
              {/* إضافة درس */}
              <div className="flex items-center gap-2 mt-2 flex-row-reverse">
                <Button
                  size="sm"
                  onClick={() => handleAddLesson(section.id)}
                  variant="secondary"
                  className="bg-white text-[#1a237e] border border-gray-300 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4 ml-1" /> إضافة درس
                </Button>
                <input
                  className="border rounded px-2 py-1 text-sm bg-white text-gray-900 border-gray-300"
                  placeholder="اسم الدرس الجديد"
                  value={lessonNames[section.id] || ""}
                  onChange={(e) =>
                    setLessonNames({
                      ...lessonNames,
                      [section.id]: e.target.value,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddLesson(section.id);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* إضافة قسم */}
      <div className="flex items-center gap-2 mt-8 self-start ">
        <Button
          type="button"
          variant="link"
          className="text-[#1a237e] flex items-center gap-1 p-0 h-auto"
          onClick={() => {
            setSectionModalMode("add");
            setSectionName("");
            setSectionDescription("");
            setEditingSection(null);
            setShowSectionModal(true);
          }}
        >
          إضافة قسم <Plus className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <Dialog open={showSectionModal} onOpenChange={(open) => {
        if (!open) {
          setShowSectionModal(false);
          setEditingSection(null);
        }
      }}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{sectionModalMode === "add" ? "إضافة قسم جديد" : "تعديل القسم"}</DialogTitle>
          </DialogHeader>
          <input
            ref={sectionInputRef}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7] transition-all duration-150 shadow-sm mt-4"
            placeholder="اسم القسم"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddOrEditSection();
            }}
            autoFocus
          />
          <Label htmlFor="sectionDescription">وصف القسم</Label>
          <Textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7] transition-all duration-150 shadow-sm mt-4"
            placeholder="وصف القسم"
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => {
                setShowSectionModal(false);
                setEditingSection(null);
              }}>
                إلغاء
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddOrEditSection} disabled={!sectionName.trim()}>
              {sectionModalMode === "add" ? "إضافة" : "تعديل"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}