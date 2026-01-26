import FormFields from "@/components/shared/form-fields/form-fields";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import useFormValidations from "@/hooks/useFormValidations";
import type { mediaSchema, MediaSchema } from "@/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Control } from "react-hook-form";
import { useCourseManageStore } from "../../store";
import { useEffect } from "react";

export default function MediaForm() {
    const { getFormFields } = useFormFields({ slug: Pages.MEDIA });
    const { getValidationSchema } = useFormValidations({ slug: Pages.MEDIA });

    // Connect to store with selective subscriptions
    const setThumbnail = useCourseManageStore((state) => state.setThumbnail);
    const setPreviewVideo = useCourseManageStore((state) => state.setPreviewVideo);

    const {
        control,
        formState: { errors },
        watch,
    } = useForm<MediaSchema>({
        defaultValues: {
            thumbnailUrl: undefined,
            previewVideo: undefined,
        },
        mode: "onChange",
        resolver: zodResolver(getValidationSchema() as typeof mediaSchema),
    });

    const thumbnail = watch("thumbnailUrl");
    const previewVideo = watch("previewVideo");

    useEffect(() => {
        if (thumbnail) {
            setThumbnail(thumbnail as unknown as File);
        } else {
            setThumbnail(null);
        }
    }, [thumbnail, setThumbnail]);

    useEffect(() => {
        if (previewVideo) {
            setPreviewVideo(previewVideo as unknown as File);
        } else {
            setPreviewVideo(null);
        }
    }, [previewVideo, setPreviewVideo]);

    return (
        <div className="flex flex-col gap-6">
            {getFormFields().map((field, index) => (
                <div key={index} className="mb-4">
                    <FormFields
                        {...field}
                        control={control as unknown as Control<Record<string, unknown>>}
                        errors={errors}
                    />
                </div>
            ))}
        </div>
    );
}
