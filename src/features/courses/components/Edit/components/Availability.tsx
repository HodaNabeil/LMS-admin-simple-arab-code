import { useState } from "react";
import ReactSelect, { components, type SingleValue, type StylesConfig, type OptionProps } from "react-select";
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
    fontWeight: "bold",
    backgroundColor: "#f8fafc",
    borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",
    boxShadow: state.isFocused ? "0 0 0 2px #2563eb33" : undefined,
    minHeight: 48,
    width: "100%",
    cursor: "pointer",
  }),
  menu: (base) => ({
    ...base,
    direction: "rtl",
    backgroundColor: "#fff",
    border: "1px solid #2563eb",
    borderRadius: 8,
    marginTop: 4,
    zIndex: 100,
    cursor: "pointer",
  }),
  option: (base, state) => ({
    ...base,
    textAlign: "right",
    backgroundColor: state.isSelected
      ? "#2563eb"
      : state.isFocused
      ? "#e0e7ef"
      : "#fff",
    color: state.isSelected ? "#fff" : "#407ef7",
    fontWeight: state.isSelected ? "bold" : "normal",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
    paddingRight: 32,
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
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "#2563eb",
  }),
};

const Option = (props: OptionProps<OptionType, false>) => (
  <components.Option {...props}>
    {props.isSelected && <Check size={18} color="#2563eb" style={{ marginLeft: 8 }} />}
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
    console.log(formData); // { status: {value, label}, isVisible: true/false }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" dir="rtl">
      <div>
        <Label htmlFor="status-select" className="block mb-2 text-base font-bold text-blue-500">
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
              primary: "#2563eb",
              primary25: "#e0e7ef",
              neutral0: "#fff",
              neutral80: "#407ef7",
              neutral20: "#2563eb",
              neutral30: "#2563eb",
            },
          })}
        />
      </div>

      <div className="flex items-center gap-3 mt-2">
        <Checkbox
          id="visible-checkbox"
          checked={formData.isVisible}
          onCheckedChange={handleVisibilityChange}
        />
        <Label htmlFor="visible-checkbox" className="text-base font-bold text-blue-500 cursor-pointer">
          إظهار للطلاب
        </Label>
      </div>

      <Button type="submit" className="w-full">
        حفظ
      </Button>
    </form>
  );
}
