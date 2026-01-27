import type { IFormField } from "@/types/app";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Select from 'react-select';

interface SelectOption {
    value: string;
    label: string;
}

interface Props extends IFormField {
    errors: FieldErrors;
    control: Control<Record<string, unknown>>;
    options?: SelectOption[];
}

const MultiSelectField = ({
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
                render={({ field: { onChange, value } }) => {
                    // react-select expects an array of { value, label } for multi-select
                    // but our form state probably just wants an array of strings (ids)
                    const selectedOptions = options.filter(opt =>
                        Array.isArray(value) && value.includes(opt.value)
                    );

                    return (
                        <Select
                            isMulti
                            isRtl
                            options={options}
                            value={selectedOptions}
                            onChange={(newValue) => {
                                onChange(newValue ? (newValue as SelectOption[]).map(opt => opt.value) : []);
                            }}
                            isDisabled={disabled}
                            placeholder={placeholder}
                            classNamePrefix="react-select"
                            className={`text-sm ${hasError ? 'border-destructive' : ''}`}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: hasError ? 'hsl(var(--destructive))' : base.borderColor,
                                    '&:hover': {
                                        borderColor: hasError ? 'hsl(var(--destructive))' : base.borderColor,
                                    }
                                }),
                            }}
                        />
                    );
                }}
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

export default MultiSelectField;
