import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCourseManageStore } from "../store";
import {
    useUpdateCourse,
    useUploadCourseMedia,
} from "@/features/courses/hooks/useCoursesMutations";
import {
    handleAvailabilitySave,
    handleBasicsSave,
    handleGoalsSave,
    handlePricingSave,
} from "./saveSectionHandlers";

export function useCourseManageSave(section: string | null) {
    const store = useCourseManageStore();
    const { slug } = useParams<{ slug: string }>();

    const courseSlug = slug as string;

    const { mutateAsync: updateCourse, isPending: isUpdating } = useUpdateCourse({
        slug: courseSlug,
    });


    const { mutateAsync: uploadMedia, isPending: isUploading } = useUploadCourseMedia({
        slug: courseSlug,
    });

    const handleSave = async () => {
        if (!courseSlug) {
            toast.error("Course slug not found");
            return;
        }

        try {
            switch (section) {
                case "goals":
                    await handleGoalsSave(store, updateCourse);
                    break;
                case "basics":
                    await handleBasicsSave(store, updateCourse, uploadMedia);
                    break;
                case "pricing":
                    await handlePricingSave(store, updateCourse);
                    break;
                case "availability":
                    await handleAvailabilitySave(store, updateCourse);
                    break;
                default:
                    break;
            }

            toast.success("تم حفظ التغييرات بنجاح");
        } catch (error) {
            console.error(error);
        }
    };

    return {
        handleSave,
        isPending: isUpdating || isUploading
    };
}
