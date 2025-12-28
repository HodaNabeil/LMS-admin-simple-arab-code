import { Button } from "@/components/ui/button";
import FormFields from "@/components/shared/form-fields/form-fields";
import RemoteImage from "@/components/shared/RemoteImage";
import { ExistingPDFDisplay } from "./ExistingPDFDisplay";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import type { Path } from "@/types/path";
import type { IFormField } from "@/types/app";

interface PathFormFieldProps {
    field: IFormField;
    control: Control<FieldValues>;
    errors: FieldErrors<FieldValues>;
    isEditMode: boolean;
    pathData?: Path;
    formLoading: boolean;
    isChangingImage: boolean;
    setIsChangingImage: (value: boolean) => void;
    isChangingRoadmap: boolean;
    setIsChangingRoadmap: (value: boolean) => void;
    currentStep: number;
}

export const PathFormField = ({
    field,
    control,
    errors,
    isEditMode,
    pathData,
    formLoading,
    isChangingImage,
    setIsChangingImage,
    isChangingRoadmap,
    setIsChangingRoadmap,
    currentStep,
}: PathFormFieldProps) => {
    if (isEditMode && field.name === "image" && pathData?.image) {
        if (!isChangingImage) {
            return (
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                        {field.label}
                    </label>
                    <div className="relative">
                        <RemoteImage
                            prefix="static"
                            src={pathData.image}
                            alt="صورة المسار"
                            className="w-full h-40 object-cover rounded-lg border"
                        />
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsChangingImage(true)}
                        disabled={formLoading}
                        className="w-full"
                    >
                        تغيير الصورة
                    </Button>
                </div>
            );
        }
        return (
            <div className="space-y-3">
                <FormFields {...field} control={control} errors={errors} />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsChangingImage(false)}
                    disabled={formLoading}
                    className="w-full"
                >
                    إلغاء التغيير
                </Button>
            </div>
        );
    }

    if (
        isEditMode &&
        currentStep === 2 &&
        field.name === "roadmap" &&
        pathData?.roadmapUrl
    ) {
        if (!isChangingRoadmap) {
            return (
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground block">
                        {field.label}
                    </label>
                    <ExistingPDFDisplay
                        fileUrl={pathData.roadmapUrl}
                        fileName="خريطة المسار.pdf"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsChangingRoadmap(true)}
                        disabled={formLoading}
                        className="w-full"
                    >
                        تغيير ملف PDF
                    </Button>
                </div>
            );
        }
        return (
            <div className="space-y-3">
                <FormFields {...field} control={control} errors={errors} />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsChangingRoadmap(false)}
                    disabled={formLoading}
                    className="w-full"
                >
                    إلغاء التغيير
                </Button>
            </div>
        );
    }

    return <FormFields {...field} control={control} errors={errors} />;
};
