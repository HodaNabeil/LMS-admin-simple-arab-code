import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectOption {
  value: string;
  label: string;
}

interface Props extends IFormField {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
  options?: SelectOption[];
}

const SelectField = ({
  label,
  name,
  disabled,
  errors,
  control,
  placeholder,
  options = [],
}: Props) => {
  const hasError = Boolean(errors[name]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label
          htmlFor={name}
          className="text-sm font-medium leading-none mb-1 text-card-foreground"
        >
          {label}
        </Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            value={typeof value === "string" ? value : ""}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger
              ref={ref}
              className={`text-gray-600 focus:outline-none focus:ring-0 focus:border-transparent ${
                hasError ? "border-destructive focus:ring-destructive/20" : ""
              }`}
              aria-invalid={hasError ? "true" : "false"}
              aria-describedby={hasError ? `${name}-error` : undefined}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className=" border-gray-300  ">
              {options.map((option) => (
                <SelectItem
                  className="!text-sm  text-gray-600 p-[0.8rem] cursor-pointer hover:bg-gray-100"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {hasError && (
        <p
          id={`${name}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SelectField;
