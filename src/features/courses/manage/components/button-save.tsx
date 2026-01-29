import { Button } from "@/components/ui/button";
import { useCourseManageSave } from "../hooks/useCourseManageSave";
import { useCurrentManageSection } from "../hooks/useCurrentManageSection";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import { useParams } from "react-router-dom";

export default function ButtonSave() {
    const currentSection = useCurrentManageSection();
    const { slug } = useParams<{ slug: string }>();
    const { data: courseResponse } = useCourse(slug);

    // Prepare original data for change detection
    const originalData = courseResponse ? {
        title: courseResponse.data.course.title,
        description: courseResponse.data.course.description,
        level: courseResponse.data.course.level,
        slug: courseResponse.data.course.slug,
        hours: courseResponse.data.course.hours ?? 0,
        shortDescription: courseResponse.data.course.shortDescription,
    } : undefined;

    const { handleSave, isPending } = useCourseManageSave(currentSection, originalData);

    return (
        <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? "جاري الحفظ..." : "حفظ"}
        </Button>
    );
}
