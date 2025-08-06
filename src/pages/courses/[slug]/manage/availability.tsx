import { useState } from "react";
import ReactSelect, {
  components,
  type SingleValue,
  type StylesConfig,
  type OptionProps,
} from "react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type OptionType = { value: string; label: string };

const selectOptions: OptionType[] = [
  { value: "available", label: "متاح" },
  { value: "unavailable", label: "غير متاح" },
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

export default function Availability() {
  const [formData, setFormData] = useState<{
    status: OptionType;
    isVisible: boolean;
  }>({
    status: selectOptions[0],
    isVisible: false,
  });

  const handleStatusChange = (option: SingleValue<OptionType>) => {
    if (option) {
      setFormData((prev) => ({ ...prev, status: option }));
    }
  };

  const handleVisibilityChange = (checked: boolean | "indeterminate") => {
    setFormData((prev) => ({ ...prev, isVisible: checked === true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 " dir="rtl">
      <div>
        <Label
          htmlFor="status-select"
          className="block mb-2 text-base font-bold !text-[#297bff]"
        >
          حالة الكورس
        </Label>
        <ReactSelect
          inputId="status-select"
          classNamePrefix="react-select"
          options={selectOptions}
          value={formData.status}
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
          checked={formData.isVisible}
          onCheckedChange={handleVisibilityChange}
          className="!border-[#297bff]  !rounded-[4px]"
        />
        <Label
          htmlFor="visible-checkbox"
          className="text-base font-bold !text-[#297bff] cursor-pointer"
        >
          إظهار للطلاب
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full text-base font-bold py-2 !bg-[#297bff] hover:!bg-[#297bff]/80"
      >
        حفظ
      </Button>
    </form>
  );
}
