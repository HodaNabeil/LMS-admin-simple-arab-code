import type { Control, FieldErrors } from "react-hook-form";
import type { CreatePathDto, UpdatePathDto } from "@/validations/path";
import type { IFormField } from "@/types/app";
import { PathFormField } from "./components/form/PathFormField";

interface PathFormBodyProps {
    fields: IFormField[];
    control: Control<CreatePathDto | UpdatePathDto>;
    errors: FieldErrors<CreatePathDto | UpdatePathDto>;
}

export function PathFormBody({ fields, control, errors }: PathFormBodyProps) {
    return (
        <>
            {fields.map((field) => (
                <div key={field.name} className="mb-6">
                    <PathFormField field={field} control={control} errors={errors} />
                </div>
            ))}
        </>
    );
}
