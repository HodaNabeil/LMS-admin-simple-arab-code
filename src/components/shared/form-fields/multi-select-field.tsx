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
                                placeholder={placeholder || "اختر..."}
                                noOptionsMessage={() => "لا توجد خيارات متاحة"}
                                classNamePrefix="react-select"
                                className="text-sm"
                                styles={{
                                    control: (base, state) => ({
                                        ...base,
                                        backgroundColor: 'var(--background)',
                                        borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
                                        boxShadow: state.isFocused ? '0 0 0 1px var(--primary)' : 'none',
                                        '&:hover': {
                                            borderColor: 'var(--primary)',
                                        },
                                        borderRadius: '0.5rem',
                                        minHeight: '2.5rem',
                                        transition: 'all 0.2s',
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: 'var(--popover)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                        overflow: 'hidden',
                                        zIndex: 50,
                                        marginTop: '4px',
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected
                                            ? 'var(--primary)'
                                            : state.isFocused
                                                ? 'var(--accent)'
                                                : 'transparent',
                                        color: state.isSelected
                                            ? 'var(--primary-foreground)'
                                            : state.isFocused
                                                ? 'var(--accent-foreground)'
                                                : 'var(--popover-foreground)',
                                        '&:active': {
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--primary-foreground)',
                                        },
                                        cursor: 'pointer',
                                        padding: '8px 12px',
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: 'var(--primary)',
                                        borderRadius: '4px',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2px',
                                        paddingLeft: '4px',
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        color: 'var(--primary-foreground)',
                                        padding: '0 4px',
                                        fontSize: '0.875rem',
                                    }),
                                    multiValueRemove: (base) => ({
                                        ...base,
                                        color: 'var(--primary-foreground)',
                                        opacity: 0.8,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            color: 'white',
                                            opacity: 1,
                                        },
                                        borderRadius: '2px',
                                        transition: 'all 0.2s',
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: 'var(--muted-foreground)',
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        color: 'var(--foreground)',
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: 'var(--foreground)',
                                    }),
                                    indicatorSeparator: () => ({
                                        display: 'none',
                                    }),
                                    dropdownIndicator: (base, state) => ({
                                        ...base,
                                        color: state.isFocused ? 'var(--primary)' : 'var(--muted-foreground)',
                                        '&:hover': {
                                            color: 'var(--primary)',
                                        }
                                    }),
                                    clearIndicator: (base) => ({
                                        ...base,
                                        color: 'var(--muted-foreground)',
                                        '&:hover': {
                                            color: 'var(--destructive)',
                                        }
                                    }),
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
