import { useState } from "react";
import { type Control, type FieldErrors } from "react-hook-form";
import FormFields from "@/components/shared/form-fields/form-fields";
import type { BasicsSchema } from "@/validations/course";

interface MediaFieldProps {
    name: "thumbnail" | "previewVideo";
    label: string;
    placeholder?: string;
    control: Control<BasicsSchema>;
    errors: FieldErrors<BasicsSchema>;
    currentValue?: File | string | null;
    type: "image" | "video";
}

export default function MediaField({
    name,
    label,
    placeholder,
    control,
    errors,
    currentValue,
    type,
}: MediaFieldProps) {
    const [isReplacing, setIsReplacing] = useState(false);

    const hasExistingValue = currentValue && typeof currentValue === "string";

    if (hasExistingValue && !isReplacing) {
        return (
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">{label}</label>
                <div className="border rounded-lg p-4 bg-gray-50">
                    {type === "image" ? (
                        <img
                            src={currentValue}
                            alt={`${label} Preview`}
                            className="max-w-full h-auto max-h-64 rounded-lg object-cover mb-3"
                        />
                    ) : (
                        <video
                            src={currentValue}
                            controls
                            className="max-w-full h-auto max-h-96 rounded-lg mb-3"
                        >
                            متصفحك لا يدعم تشغيل الفيديو
                        </video>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsReplacing(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        استبدال {type === "image" ? "الصورة" : "الفيديو"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <FormFields
                name={name}
                label={label}
                placeholder={placeholder}
                type="file" // Assuming FormFields handles 'file' type correctly based on passed props or internal logic
                control={control}
                errors={errors}
            />
            {hasExistingValue && isReplacing && (
                <button
                    type="button"
                    onClick={() => setIsReplacing(false)}
                    className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                    إلغاء
                </button>
            )}
        </div>
    );
}
