import type { IFormField } from "@/types/app";
import Select from 'react-select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import type { Control, FieldValues } from "react-hook-form";

interface SelectOption {
    value: string;
    label: string;
}

interface Props extends IFormField {
    control: Control<FieldValues>;
    options?: SelectOption[];
}

const MultiSelectField = ({
    label,
    name,
    disabled,
    control,
    placeholder,
    options = [],
    required,
}: Props) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const value = field.value || [];
                const selectedOptions = options.filter(opt =>
                    Array.isArray(value) && value.includes(opt.value)
                );

                return (
                    <FormItem className="flex flex-col gap-2">
                        {label && (
                            <FormLabel className="text-sm font-medium text-foreground">
                                {label} {required && <span className="text-destructive">*</span>}
                            </FormLabel>
                        )}
                        <FormControl>
                            <Select
                                isMulti
                                isRtl
                                options={options}
                                value={selectedOptions}
                                onChange={(newValue) => {
                                    field.onChange(newValue ? (newValue as SelectOption[]).map(opt => opt.value) : []);
                                }}
                                onBlur={field.onBlur}
                                isDisabled={disabled}
                                placeholder={placeholder}
                                classNamePrefix="react-select"
                                className="text-sm"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        backgroundColor: 'transparent',
                                        borderColor: state.isFocused ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            borderColor: state.isFocused ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                                        },
                                        borderRadius: '0.75rem',
                                        minHeight: '2.5rem',
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: 'hsl(var(--popover))',
                                        border: '1px solid hsl(var(--border))',
                                        borderRadius: '0.75rem',
                                        overflow: 'hidden',
                                        zIndex: 50,
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'transparent',
                                        color: state.isFocused ? 'hsl(var(--accent-foreground))' : 'hsl(var(--popover-foreground))',
                                        '&:active': {
                                            backgroundColor: 'hsl(var(--accent))',
                                        },
                                        cursor: 'pointer',
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: 'hsl(var(--secondary))',
                                        borderRadius: '0.375rem',
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        color: 'hsl(var(--secondary-foreground))',
                                    }),
                                    multiValueRemove: (base) => ({
                                        ...base,
                                        color: 'hsl(var(--secondary-foreground))',
                                        '&:hover': {
                                            backgroundColor: 'hsl(var(--destructive))',
                                            color: 'hsl(var(--destructive-foreground))',
                                            borderRadius: '0.375rem',
                                        },
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: 'hsl(var(--muted-foreground))',
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        color: 'hsl(var(--foreground))',
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: 'hsl(var(--foreground))',
                                    })
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};

export default MultiSelectField;
