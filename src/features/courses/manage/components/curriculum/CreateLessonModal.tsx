// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import type { CurriculumAction, CurriculumState } from "../hooks/stateHelper";
// import type { Dispatch } from "react";

// export default function CreateLessonModal({
//   state,
//   dispatch,
//   randomId,
// }: {
//   state: CurriculumState;
//   dispatch: Dispatch<CurriculumAction>;
//   randomId: () => string;
// }) {
//   return (
//     <Dialog
//       open={!!state.showLessonModal}
//       onOpenChange={(open) => {
//         if (!open) {
//           dispatch({ type: "SET_SHOW_LESSON_MODAL", payload: null });
//           dispatch({ type: "SET_NEW_LESSON_NAME", payload: "" });
//           dispatch({ type: "SET_NEW_LESSON_DESCRIPTION", payload: "" });
//         }
//       }}
//     >
//       <DialogContent showCloseButton={false}>
//         <DialogHeader>
//           <DialogTitle>
//             {state.showLessonModal?.mode === "edit"
//               ? "تعديل الدرس"
//               : "إضافة درس جديد"}
//           </DialogTitle>
//         </DialogHeader>
//         <input
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7] transition-all duration-150 shadow-sm mt-4"
//           placeholder="اسم الدرس"
//           value={state.newLessonName}
//           onChange={(e) =>
//             dispatch({ type: "SET_NEW_LESSON_NAME", payload: e.target.value })
//           }
//           autoFocus
//         />
//         <Label htmlFor="lessonDescription">وصف الدرس</Label>
//         <Textarea
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#d4d7f7] focus:border-[#d4d7f7] transition-all duration-150 shadow-sm mt-4"
//           placeholder="وصف الدرس"
//           value={state.newLessonDescription}
//           onChange={(e) =>
//             dispatch({
//               type: "SET_NEW_LESSON_DESCRIPTION",
//               payload: e.target.value,
//             })
//           }
//         />
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => {
//                 dispatch({ type: "SET_SHOW_LESSON_MODAL", payload: null });
//                 dispatch({ type: "SET_NEW_LESSON_NAME", payload: "" });
//                 dispatch({ type: "SET_NEW_LESSON_DESCRIPTION", payload: "" });
//               }}
//             >
//               إلغاء
//             </Button>
//           </DialogClose>
//           {state.showLessonModal?.mode === "edit" ? (
//             <Button
//               type="button"
//               onClick={() => {
//                 if (
//                   !state.newLessonName.trim() ||
//                   !state.showLessonModal ||
//                   !state.showLessonModal.lessonId
//                 )
//                   return;
//                 dispatch({
//                   type: "SET_SECTIONS",
//                   payload: state.sections.map((s) =>
//                     s.id === state.showLessonModal!.sectionId
//                       ? {
//                           ...s,
//                           lessons: s.lessons.map((l) =>
//                             l.id === state.showLessonModal!.lessonId
//                               ? {
//                                   ...l,
//                                   name: state.newLessonName,
//                                   description: state.newLessonDescription,
//                                 }
//                               : l
//                           ),
//                         }
//                       : s
//                   ),
//                 });
//                 dispatch({ type: "SET_SHOW_LESSON_MODAL", payload: null });
//                 dispatch({ type: "SET_NEW_LESSON_NAME", payload: "" });
//                 dispatch({ type: "SET_NEW_LESSON_DESCRIPTION", payload: "" });
//               }}
//               disabled={!state.newLessonName.trim()}
//             >
//               تعديل
//             </Button>
//           ) : (
//             <Button
//               type="button"
//               onClick={() => {
//                 if (!state.newLessonName.trim() || !state.showLessonModal)
//                   return;
//                 dispatch({
//                   type: "SET_SECTIONS",
//                   payload: state.sections.map((s) =>
//                     s.id === state.showLessonModal!.sectionId
//                       ? {
//                           ...s,
//                           lessons: [
//                             ...s.lessons,
//                             {
//                               id: randomId(),
//                               name: state.newLessonName,
//                               video: null,
//                               description: state.newLessonDescription,
//                             },
//                           ],
//                         }
//                       : s
//                   ),
//                 });
//                 dispatch({ type: "SET_SHOW_LESSON_MODAL", payload: null });
//                 dispatch({ type: "SET_NEW_LESSON_NAME", payload: "" });
//                 dispatch({ type: "SET_NEW_LESSON_DESCRIPTION", payload: "" });
//               }}
//               disabled={!state.newLessonName.trim()}
//             >
//               إضافة
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

function CreateLessonModal() {
  return <div></div>;
}

export default CreateLessonModal;
