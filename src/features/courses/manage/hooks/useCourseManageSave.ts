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
import { UpdateCourseDtoLevel } from "@/types/api.generated";

interface OriginalCourseData {
    title?: string;
    description?: string;
    level?: UpdateCourseDtoLevel;
    slug?: string;
    hours?: number;
    shortDescription?: string;
}

export function useCourseManageSave(section: string | null, originalData?: OriginalCourseData) {
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
            let changesSaved = false;

            switch (section) {
                case "goals":
                    await handleGoalsSave(store, updateCourse);
                    changesSaved = true;
                    break;
                case "basics":
                    // Helper to normalize empty values
                    const normalize = (value: any) => value || "";

                    // handleBasicsSave returns early if no changes, so we need to check
                    const hasMedia = store.thumbnailUrl instanceof File || store.previewVideo instanceof File;
                    const hasDataChanged = !originalData || (
                        normalize(store.title) !== normalize(originalData.title) ||
                        normalize(store.description) !== normalize(originalData.description) ||
                        (store.level as any) !== originalData.level ||
                        normalize(store.slug) !== normalize(originalData.slug) ||
                        store.hours !== originalData.hours ||
                        normalize(store.shortDescription) !== normalize(originalData.shortDescription)
                    );

                    if (hasDataChanged || hasMedia) {
                        await handleBasicsSave(store, updateCourse, uploadMedia, originalData);
                        changesSaved = true;
                    } else if (process.env.NODE_ENV === 'development') {
                        console.log('⏭️ No changes detected in handleSave');
                    }
                    break;
                case "pricing":
                    await handlePricingSave(store, updateCourse);
                    changesSaved = true;
                    break;
                case "availability":
                    await handleAvailabilitySave(store, updateCourse);
                    changesSaved = true;
                    break;
                default:
                    break;
            }

            if (changesSaved) {
                toast.success("تم حفظ التغييرات بنجاح");
            } else {
                toast.info("لا توجد تغييرات للحفظ");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const hasMedia = () => {
        const { thumbnailUrl, previewVideo } = store;
        return thumbnailUrl instanceof File || previewVideo instanceof File;
    };


    const handleSaveWithMediaSeparation = async (
        regularData: any,
        options?: {
            onMediaUploadSuccess?: () => void;
            onRegularDataSuccess?: () => void;
        }
    ) => {
        if (!courseSlug) {
            toast.error("Course slug not found");
            return;
        }

        try {
            const promises: Promise<any>[] = [];

            const regularDataPromise = updateCourse(regularData).then((res) => {
                options?.onRegularDataSuccess?.();
                return res;
            });
            promises.push(regularDataPromise);

            const hasThumbnail = store.thumbnailUrl instanceof File;
            const hasVideo = store.previewVideo instanceof File;

            if (hasThumbnail || hasVideo) {
                const mediaPromise = uploadMedia({
                    thumbnailUrl: hasThumbnail ? (store.thumbnailUrl as File) : undefined as any,
                    previewVideo: hasVideo ? (store.previewVideo as File) : undefined,
                }).then((res) => {
                    options?.onMediaUploadSuccess?.();
                    return res;
                });
                promises.push(mediaPromise);
            }

            await Promise.all(promises);

            toast.success("تم حفظ التغييرات بنجاح");
        } catch (error) {
            console.error("Error in handleSaveWithMediaSeparation:", error);
            throw error;
        }
    };

    return {
        handleSave,
        handleSaveWithMediaSeparation,
        isPending: isUpdating || isUploading,
        hasMedia,
        isUpdating,
        isUploading,
    };
}
