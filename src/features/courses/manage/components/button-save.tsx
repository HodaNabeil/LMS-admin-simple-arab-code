import { Button } from "@/components/ui/button";
import { useCourseManageStore } from '../store';
import { useUpdateCourse, useUploadCourseMedia } from '../../hooks/useCoursesMutations';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { UpdateCourseDtoStatus, UpdateCourseDtoVisibility, UpdateCourseDtoLevel } from "@/types/api.generated";

export default function ButtonSave() {
    const params = useParams();
    const slug = params.slug as string;

    const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({ slug });
    const { mutateAsync: uploadMedia, isPending: isUploading } = useUploadCourseMedia({ slug });

    const {
        whatYouWillLearn,
        audienceTags,
        knowledgeNeeded,
        selectedCourses,
        courseStatus,
        isAvailableForPurchase,
        title,
        description,
        level,
        thumbnailUrl,
        previewVideo,
        price,
        compareAtPrice,
    } = useCourseManageStore();

    const isPending = isUpdating || isUploading;

    const selectedCoursesValues = selectedCourses.map((course) => course.value)
    const handleSave = async () => {
        if (!slug) {
            toast.error("Course slug not found");
            return;
        }

        try {
            await updateCourse({
                title,
                description,
                level: level as unknown as UpdateCourseDtoLevel,
                objectives: whatYouWillLearn,
                tags: audienceTags,
                requirements: [
                    ...(knowledgeNeeded ? [knowledgeNeeded] : []),
                    ...selectedCoursesValues
                ],
                status: courseStatus?.value?.toUpperCase() as UpdateCourseDtoStatus,
                visibility: isAvailableForPurchase
                    ? UpdateCourseDtoVisibility.PUBLIC
                    : UpdateCourseDtoVisibility.PRIVATE,
                price,
                compareAtPrice,
            });

            if (thumbnailUrl instanceof File) {
                await uploadMedia({ thumbnailUrl, previewVideo: previewVideo instanceof File ? previewVideo : undefined });
            }
        } catch (error) {
            console.error(error);
            // Error handling is done via hooks usually (toast on error)
        }
    };

    return (
        <Button
            type="button"
            onClick={handleSave}
            disabled={isPending}
        >
            {isPending ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
    )
}
