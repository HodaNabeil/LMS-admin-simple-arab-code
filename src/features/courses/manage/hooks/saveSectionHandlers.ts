import { UpdateCourseDtoLevel, UpdateCourseDtoStatus, UpdateCourseDtoVisibility } from "@/types/api.generated";
import type { UpdateCourseRequest } from "@/types/course";


import { type CourseGoalsState } from "../store";

// Helper types
type UpdateCourseFn = (data: UpdateCourseRequest) => Promise<unknown>;
type UploadMediaFn = (data: { thumbnail: File; previewVideo?: File | undefined }) => Promise<unknown>;

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
    uploadMedia: UploadMediaFn,
    originalData?: {
        title?: string;
        description?: string;
        level?: UpdateCourseDtoLevel;
        slug?: string;
        hours?: number;
        shortDescription?: string;
    }
) {
    const promises: Promise<unknown>[] = [];

    // Helper to normalize empty values (treats null, undefined, and "" as equal)
    const normalize = (value: unknown) => value || "";

    // Check if we have media to upload
    const thumbnail = store.thumbnail instanceof File;
    const previewVideo = store.previewVideo instanceof File;
    const hasMedia = thumbnail || previewVideo;

    // Check if regular data has changed (with normalization for optional fields)
    const hasDataChanged = !originalData || (
        normalize(store.title) !== normalize(originalData.title) ||
        normalize(store.description) !== normalize(originalData.description) ||
        (store.level as unknown as UpdateCourseDtoLevel) !== originalData.level ||
        normalize(store.slug) !== normalize(originalData.slug) ||
        store.hours !== originalData.hours ||
        normalize(store.shortDescription) !== normalize(originalData.shortDescription)
    );

    // Development logging with details
    if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Starting parallel save operation...');
        console.log('📊 Has original data:', !!originalData);



        console.log('📊 Data changed:', hasDataChanged);
        console.log('🖼️ Has media:', hasMedia);

        if (hasDataChanged) {
            console.log('📝 Sending regular data update');
        }
        if (hasMedia) {
            console.log('🖼️ Sending media files:', {
                thumbnail,
                video: previewVideo
            });
        }
    }

    // Early return if nothing to save
    if (!hasDataChanged && !hasMedia) {
        if (process.env.NODE_ENV === 'development') {
            console.log('ℹ️ No changes to save - skipping all requests');
        }
        return;
    }

    // Only send regular data if something has changed
    if (hasDataChanged) {
        const regularDataPromise = updateCourse({
            title: store.title,
            description: store.description,
            level: store.level as unknown as UpdateCourseDtoLevel,
            slug: store.slug,
            shortDescription: store.shortDescription,
        }).then((res) => {
            if (process.env.NODE_ENV === 'development') {
                console.log('✅ Regular data update completed');
            }
            return res;
        });
        promises.push(regularDataPromise);
    } else if (process.env.NODE_ENV === 'development') {
        console.log('⏭️ Skipping regular data update - no changes detected');
    }

    if (hasMedia) {
        // Send media data in parallel
        const mediaPromise = uploadMedia({
            thumbnail: thumbnail ? (store.thumbnail as File) : (undefined as unknown as File),
            previewVideo: previewVideo ? (store.previewVideo as File) : undefined,
        }).then((res) => {
            if (process.env.NODE_ENV === 'development') {
                console.log('✅ Media upload completed');
            }
            return res;
        });
        promises.push(mediaPromise);
    }

    // Execute both requests in parallel (if there are any)
    if (promises.length > 0) {
        await Promise.all(promises);

        if (process.env.NODE_ENV === 'development') {
            console.log('🎉 All operations completed successfully');
        }
    }
}

export async function handlePricingSave(
    store: CourseGoalsState,
    updateCourse: UpdateCourseFn
) {
    await updateCourse({
        price: Number(store.price),
        compareAtPrice: Number(store.compareAtPrice),
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
