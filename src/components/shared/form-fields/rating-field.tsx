import { Star } from 'lucide-react';
import type { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import type { IFormField } from '@/types/app';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface RatingFieldProps extends IFormField {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
}

const RatingField = ({ name, label, control, required }: RatingFieldProps) => {
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
                        <div className="flex gap-1" onBlur={field.onBlur}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => field.onChange(star)}
                                    className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                >
                                    <Star
                                        className={cn(
                                            "w-8 h-8",
                                            star <= (field.value || 0)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-muted-foreground/30"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RatingField;
