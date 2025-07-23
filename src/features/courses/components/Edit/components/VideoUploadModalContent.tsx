import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import { FileVideo, Trash2 } from "lucide-react";
// مكون داخلي لمودال رفع الفيديو
export function VideoUploadModalContent({
  lessonVideo,
  onSave,
  onCancel,
}: {
  lessonVideo: File | null | undefined;
  onSave: (file: File | null) => void;
  onCancel: () => void;
}) {
  const [localVideo, setLocalVideo] = useState<File | null>(
    lessonVideo || null
  );
  return (
    <div className="flex flex-col gap-4">
      <SimpleVideoUpload value={localVideo} onChange={setLocalVideo} />
      {localVideo && (
        <div className="flex items-center gap-2 text-green-700 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>تم اختيار الفيديو: {localVideo.name}</span>
        </div>
      )}
      <div className="flex gap-2 justify-end mt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          إلغاء
        </Button>
        <Button
          type="button"
          onClick={() => {
            onSave(localVideo);
          }}
          disabled={!localVideo}
        >
          حفظ
        </Button>
      </div>
    </div>
  );
}

// مكون رفع فيديو بسيط بدون react-hook-form
function SimpleVideoUpload({
  value,
  onChange,
}: {
  value?: File | null;
  onChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={(e) => {
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
      {value && (
        <span className="text-xs text-green-700 flex items-center gap-1">
          {value.name}
        </span>
      )}
      {value && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => onChange(null)}
          className="text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
