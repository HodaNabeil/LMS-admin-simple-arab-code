import type { IFormField } from "@/types/app";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { Control } from "react-hook-form";

interface Props extends IFormField {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  rows?: number;
  maxLength?: number;
}

const TextareaField = ({
  label,
  name,
  placeholder,
  disabled,
  control,
  rows = 4,
  maxLength,
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
            <Textarea
              {...field}
              className={cn(
                "bg-transparent! resize-none transition-all focus-visible:ring-1 focus-visible:ring-primary",
              )}
              placeholder={placeholder || ""}
              disabled={disabled || false}
              rows={rows}
              maxLength={maxLength}
              value={String(field.value || "")}
            />
          </FormControl>
          {maxLength && (
            <p className="text-xs text-muted-foreground mt-1 text-end">
              {String(field.value || "").length} / {maxLength}
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextareaField;
