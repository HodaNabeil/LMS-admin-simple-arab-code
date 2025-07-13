interface TextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function TextareaField({
  label = "وصف المسار التعليمي (بالتفاصيل)",
  ...rest
}: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        className="w-full rounded-lg border-gray-300 border focus:border-blue-500 focus:ring-2
         focus:ring-blue-100 p-3 text-sm transition resize-y min-h-[80px] placeholder:text-gray-400"
        {...rest}
      />
    </div>
  );
}

export default TextareaField;
