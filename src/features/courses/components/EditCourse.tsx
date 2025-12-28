import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import CourseForm from "./CourseForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Edit } from "lucide-react";
import type { Course } from "@/types/course";
import { useState } from "react";
import { useUpdateCourse } from "../hooks/useCourseMutations";

export function EditCourse({ course }: { course: Course }) {
    const [courseMenu, setCourseMenu] = useState(false);
    const mutation = useUpdateCourse();

    return (
        <Dialog open={courseMenu} onOpenChange={(open) => setCourseMenu(open)}>
            <DialogTrigger asChild>
                <Edit className="h-4 w-4" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="!text-right">
                    <DialogTitle>تعديل الكورس</DialogTitle>
                </DialogHeader>
                <CourseForm course={course}
                    setCourseMenu={setCourseMenu}
                    mutation={mutation} />
            </DialogContent>
        </Dialog>
    );
}
