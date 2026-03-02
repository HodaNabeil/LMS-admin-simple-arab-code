import type { IFormField } from "@/types/app";
import { Input } from "@/components/ui/input";
import { cn } from "../../../lib/utils";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { Control } from "react-hook-form";

interface Props extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const TextField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  control,
  required,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-2">
          {label && (
            <FormLabel className="text-sm font-medium text-foreground">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              className={cn(
                "h-10 bg-transparent! transition-all",
                "focus-visible:ring-1 focus-visible:ring-primary"
              )}
              type={type}
              placeholder={placeholder || ""}
              disabled={disabled || false}
              autoFocus={autoFocus || false}
              onChange={(e) => {
                const val = e.target.value;
                if (type === "number") {
                  field.onChange(val === "" ? 0 : Number(val));
                } else {
                  field.onChange(val);
                }
              }}
              value={
                type === "number" ? (field.value || 0).toString() : String(field.value || "")
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextField;
