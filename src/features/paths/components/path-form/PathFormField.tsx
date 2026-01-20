import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import FormFields from "@/components/shared/form-fields/form-fields";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import type { IFormField } from "@/types/app";

interface PathFormFieldProps {
    field: IFormField;
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

export const PathFormField = ({
    field,
    control,
    errors,
}: PathFormFieldProps) => {
    if (field.name === "trackIds") {
        return (
            <div className="space-y-3">
                <label className="text-sm font-medium text-foreground block">
                    {field.label}
                </label>
                <Controller
                    control={control}
                    name={field.name}
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <Input
                            {...fieldProps}
                            placeholder={field.placeholder}
                            value={Array.isArray(value) ? value.join(", ") : value || ""}
                            onChange={(e) => {
                                const val = e.target.value;
                                onChange(val ? val.split(",").map((s) => s.trim()) : []);
                            }}
                        />
                    )}
                />
                {field.description && (
                    <p className="text-sm text-muted-foreground">{field.description}</p>
                )}
            </div>
        );
    }





    return <FormFields {...field} control={control} errors={errors} />;
};
