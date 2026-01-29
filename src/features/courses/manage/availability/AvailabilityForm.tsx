import { useEffect, useMemo, type JSX } from "react";
import type {
  CourseStatus as CourseStatusType,
  CourseVisibility,
} from "@/types/course";

import { useCourseManageStore } from '../store';
import { COURSE_VISIBILITY, COURSE_VISIBILITY_OPTIONS } from "@/constants/course";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type OptionType = { value: string; label: string };

const selectOptions: readonly OptionType[] = [
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
];

interface AvailabilityFormProps {
  status?: CourseStatusType;
  visibility?: CourseVisibility;
}

export default function AvailabilityForm({ status, visibility }: AvailabilityFormProps) {
  const {
    courseStatus,
    isAvailableForPurchase,
    setCourseStatus,
    setIsAvailableForPurchase
  } = useCourseManageStore();


  useEffect(() => {
    if (status) {
      const statusLower = status.toLowerCase();
      const foundOption = selectOptions.find((opt) => opt.value === statusLower);
      if (foundOption) {
        setCourseStatus(foundOption);
      }
    }
    if (visibility) {
      setIsAvailableForPurchase(visibility === COURSE_VISIBILITY.PUBLIC);
    }
  }, [status, visibility, setCourseStatus, setIsAvailableForPurchase]);

  const selectedVisibility = useMemo(() => {
    const targetValue = isAvailableForPurchase
      ? COURSE_VISIBILITY.PUBLIC
      : COURSE_VISIBILITY.PRIVATE;
    return COURSE_VISIBILITY_OPTIONS.find(opt => opt.value === targetValue) || COURSE_VISIBILITY_OPTIONS[0];
  }, [isAvailableForPurchase]);

  const handleStatusChange = (value: string) => {
    const option = selectOptions.find((opt) => opt.value === value);
    if (option) {
      setCourseStatus(option);
    }
  };

  const handleVisibilityChange = (value: string) => {
    setIsAvailableForPurchase(value === COURSE_VISIBILITY.PUBLIC);
  };

  return (
    <div className="flex flex-col gap-6 " dir="rtl">
      <FormFieldSelect
        id="status-select"
        label="حالة الدورة"
        value={courseStatus?.value}
        onValueChange={handleStatusChange}
        options={selectOptions}
        placeholder="اختر الحالة"
      />

      <FormFieldSelect
        id="visibility-select"
        label="إتاحة الدورة"
        value={selectedVisibility?.value}
        onValueChange={handleVisibilityChange}
        options={COURSE_VISIBILITY_OPTIONS}
        placeholder="اختر الإتاحة"
      />
    </div>
  );
}




interface FormFieldSelectProps {
  id: string;
  label: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: readonly OptionType[];
  placeholder?: string;
  className?: string;
}

export function FormFieldSelect({
  id,
  label,
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  className,
}: FormFieldSelectProps): JSX.Element {
  return (
    <div className={className}>
      <Label
        htmlFor={id}
        className="block mb-2 text-base font-bold !text-[#297bff]"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className="w-full h-12 bg-slate-50 border-blue-200 focus:ring-blue-500/20 text-right direction-rtl"
          dir="rtl"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent dir="rtl">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
