import { UpdateCourseDtoLevel, UpdateCourseDtoStatus, UpdateCourseDtoVisibility } from "@/types/api.generated";
import type { UpdateCourseRequest } from "@/types/course";


import { type CourseGoalsState } from "../store";

// Helper types
type UpdateCourseFn = (data: UpdateCourseRequest) => Promise<any>;
type UploadMediaFn = (data: { thumbnailUrl: File; previewVideo?: File | undefined }) => Promise<any>;

export async function handleGoalsSave(
    store: CourseGoalsState,
    updateCourse: UpdateCourseFn
) {
    await updateCourse({
        objectives: store.learningObjectives,
        targetAudience: store.targetAudience,
        requirements: store.requirements,
        prerequisiteIds: store.prerequisiteCourseIds,
    });
}

export async function handleBasicsSave(
    store: CourseGoalsState,
    updateCourse: UpdateCourseFn,
    uploadMedia: UploadMediaFn
) {
    await updateCourse({
        title: store.title,
        description: store.description,
        level: store.level as unknown as UpdateCourseDtoLevel,
        // @ts-ignore - Slug may not be in generated DTO but is accepted by API
        slug: store.slug,
        // @ts-ignore - Duration may not be in generated DTO but is accepted by API  
        hours: store.hours,
    });

    if (store.thumbnailUrl instanceof File) {
        await uploadMedia({
            thumbnailUrl: store.thumbnailUrl,
            previewVideo: store.previewVideo instanceof File ? store.previewVideo : undefined,
        });
    }
}

export async function handlePricingSave(
    store: CourseGoalsState,
    updateCourse: UpdateCourseFn
) {
    await updateCourse({
        price: store.price,
        compareAtPrice: store.compareAtPrice,
    });
}

export async function handleAvailabilitySave(
    store: CourseGoalsState,
    updateCourse: UpdateCourseFn
) {
    await updateCourse({
        status: store.courseStatus?.value.toUpperCase() as UpdateCourseDtoStatus,
        visibility: store.isAvailableForPurchase
            ? UpdateCourseDtoVisibility.PUBLIC
            : UpdateCourseDtoVisibility.PRIVATE,
    });
}
