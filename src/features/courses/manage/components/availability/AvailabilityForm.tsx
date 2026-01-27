import { useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import type {
  CourseStatus as CourseStatusType,
  CourseVisibility,
} from "@/types/course";
import ReactSelect, {
  components,
  type SingleValue,
  type StylesConfig,
  type OptionProps,
} from "react-select";
import { Check } from "lucide-react";

import { useCourseManageStore } from '../../store';
import { COURSE_VISIBILITY, COURSE_VISIBILITY_OPTIONS } from "@/constants/course";

type OptionType = { value: string; label: string };

const selectOptions: OptionType[] = [
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

  const handleStatusChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setCourseStatus(option);
    }
  };

  const handleVisibilityChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setIsAvailableForPurchase(option.value === COURSE_VISIBILITY.PUBLIC);
    }
  };

  return (
    <div className="flex flex-col gap-6 " dir="rtl">
      <div>
        <Label
          htmlFor="status-select"
          className="block mb-2 text-base font-bold !text-[#297bff]"
        >
          حالة الدورة
        </Label>
        <ReactSelect
          inputId="status-select"
          classNamePrefix="react-select"
          options={selectOptions}
          value={courseStatus}
          onChange={handleStatusChange}
          placeholder="اختر الحالة"
          styles={customStyles}
          components={{ Option }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary: "#72a4f5",
              primary25: "#72a4f5",
              neutral0: "#72a4f5",
              neutral80: "#407ef7",
              neutral20: "#2563eb",
              neutral30: "#72a4f5",
            },
          })}
        />


      </div>

      <div>
        <Label
          htmlFor="visibility-select"
          className="block mb-2 text-base font-bold !text-[#297bff]"
        >
          إتاحة الدورة
        </Label>
        <ReactSelect
          inputId="visibility-select"
          classNamePrefix="react-select"
          options={COURSE_VISIBILITY_OPTIONS}
          value={selectedVisibility}
          onChange={handleVisibilityChange}
          placeholder="اختر الإتاحة"
          styles={customStyles}
          components={{ Option }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 8,
            colors: {
              ...theme.colors,
              primary: "#72a4f5",
              primary25: "#72a4f5",
              neutral0: "#72a4f5",
              neutral80: "#407ef7",
              neutral20: "#2563eb",
              neutral30: "#72a4f5",
            },
          })}
        />
      </div>



    </div>
  );
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    direction: "rtl",
    fontWeight: "500",
    backgroundColor: "#f8fafc",
    borderColor: state.isFocused ? "#72a4f5" : "#72a4f5",
    boxShadow: state.isFocused ? "0 0 0 2px #72a4f533" : undefined,
    borderRadius: "0.5rem",
    minHeight: 48,
    width: "100%",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  }),
  menu: (base) => ({
    ...base,
    direction: "rtl",
    backgroundColor: "#fff",
    border: "1px solid #72a4f5",
    borderRadius: 8,
    marginTop: 4,
    zIndex: 100,
  }),
  option: (base, state) => ({
    ...base,
    textAlign: "right",
    backgroundColor: state.isSelected
      ? "#297bff"
      : state.isFocused
        ? "#297bff3b"
        : "#fff",
    color: state.isSelected ? "#fff" : "#7e9fe9",
    fontWeight: state.isSelected ? "bold" : "normal",
    fontSize: 16,
    paddingRight: 32,
    display: "flex",
    alignItems: "center",
    gap: 8,
    position: "relative",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 16,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "#2563eb",
    padding: 8,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const Option = (props: OptionProps<OptionType, false>) => (
  <components.Option {...props}>
    {props.isSelected && (
      <Check size={18} color="#fff" style={{ marginLeft: 8 }} />
    )}
    {props.label}
  </components.Option>
);
