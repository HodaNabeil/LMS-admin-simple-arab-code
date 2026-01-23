import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUpdateCourse } from "@/features/courses/hooks/useCoursesMutations";
import type {
  Course,
  CourseStatus as CourseStatusType,
  CourseVisibility,
  UpdateCourseStatus,
  UpdateCourseVisibility,
} from "@/types/course";
import ReactSelect, {
  components,
  type SingleValue,
  type StylesConfig,
  type OptionProps,
} from "react-select";
import { Check } from "lucide-react";

import { useCourseManageStore } from '../../store';
import { COURSE_VISIBILITY } from "@/constants/course";

type OptionType = { value: string; label: string };

const selectOptions: OptionType[] = [
  { value: "published", label: "منشور" },
  { value: "draft", label: "مسودة" },
];

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

interface AvailabilityFormProps {
  course?: Course;
}

export default function AvailabilityForm({ course }: AvailabilityFormProps) {
  const {
    courseStatus,
    isAvailableForPurchase,
    setCourseStatus,
    setIsAvailableForPurchase
  } = useCourseManageStore();

  const { mutate: updateCourse, isPending } = useUpdateCourse({ slug: course?.slug || "" });

  useEffect(() => {
    if (course) {
      if (course.status) {
        const statusLower = course.status.toLowerCase();
        const foundOption = selectOptions.find((opt) => opt.value === statusLower);
        if (foundOption) {
          setCourseStatus(foundOption);
        }
      }
      if (course.visibility) {
        setIsAvailableForPurchase(course.visibility === 'PUBLIC');
      }
    }
  }, [course, setCourseStatus, setIsAvailableForPurchase]);

  const handleStatusChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setCourseStatus(option);
    }
  };

  const handleVisibilityChange = (checked: boolean | "indeterminate") => {
    setIsAvailableForPurchase(checked === true);
  };

  const handleSave = () => {
    if (!courseStatus) return;

    // Only update status and visibility - availability form doesn't manage course level
    updateCourse({
      status: courseStatus.value.toUpperCase() as UpdateCourseStatus,
      visibility: isAvailableForPurchase
        ? (COURSE_VISIBILITY.PUBLIC as UpdateCourseVisibility)
        : (COURSE_VISIBILITY.PRIVATE as UpdateCourseVisibility),
    });
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

      <div className="flex items-center gap-3 mt-2">
        <Checkbox
          id="visible-checkbox"
          checked={isAvailableForPurchase}
          onCheckedChange={handleVisibilityChange}
          className="!border-[#297bff]  !rounded-[4px]"
        />
        <Label
          htmlFor="visible-checkbox"
          className="text-base font-bold !text-[#297bff] cursor-pointer"
        >
          متوفر للشراء
        </Label>
      </div>



    </div>
  );
}
