// import { Button } from "@/components/ui/button";
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
// import { Input } from "@/components/ui/input";
// import type {
//   CurriculumAction,
//   CurriculumState,
//   Section,
// } from "@/features/courses/hooks/stateHelper";
// import type { Dispatch, KeyboardEvent } from "react";
// // import useFormFields from "@/hooks/useFormFields";
// // import { Pages } from "@/constants/enums";
// // import FormFields from "@/components/shared/form-fields/form-fields";
// // import { Loader } from "@/components/shared/loader";
// // import { useForm, type Control } from "react-hook-form";
// // import useFormValidations from "@/hooks/useFormValidations";
// // import { zodResolver } from "@hookform/resolvers/zod";

// interface AddSectionModalProps {
//   state: CurriculumState;
//   dispatch: Dispatch<CurriculumAction>;
//   sectionInputRef: React.RefObject<HTMLInputElement>;
//   randomId: () => string;
// }

// export default function AddSectionModal({
//   state,
//   dispatch,
//   sectionInputRef,
//   randomId,
// }: AddSectionModalProps) {
//   // const { getFormFields } = useFormFields({ slug: Pages.CURRICULUM });
//   // const { getValidationSchema } = useFormValidations({
//   //   slug: Pages.CURRICULUM,
//   // });

//   // const {
//   //   // handleSubmit,
//   //   control,
//   //   formState: { errors, isSubmitting },
//   // } = useForm({
//   //   defaultValues: {
//   //     sectionName: state.sectionName,
//   //     sectionDescription: state.sectionDescription,
//   //   },
//   //   mode: "onChange",
//   //   resolver: zodResolver(getValidationSchema()),
//   // });

//   const isEditMode = state.sectionModalMode === "edit";
//   const isAddMode = state.sectionModalMode === "add";
//   const canSubmit = state.sectionName.trim().length > 0;

//   // Create new section
//   const createNewSection = (): Section => ({
//     id: randomId(),
//     name: state.sectionName.trim(),
//     description: state.sectionDescription.trim(),
//     lessons: [],
//   });

//   // Update existing section
//   const updateSection = (sections: Section[]): Section[] =>
//     sections.map((section) =>
//       section.id === state.editingSection!.id
//         ? {
//             ...section,
//             name: state.sectionName.trim(),
//             description: state.sectionDescription.trim(),
//           }
//         : section
//     );

//   // Reset form state
//   const resetForm = () => {
//     dispatch({ type: "SET_SECTION_NAME", payload: "" });
//     dispatch({ type: "SET_SECTION_DESCRIPTION", payload: "" });
//     dispatch({ type: "SET_EDITING_SECTION", payload: null });
//   };

//   // Close modal
//   const closeModal = () => {
//     dispatch({ type: "SET_SHOW_SECTION_MODAL", payload: false });
//     resetForm();
//   };

//   // Handle add or edit section
//   const handleSubmit = () => {
//     if (!canSubmit) return;

//     if (isAddMode) {
//       const newSection = createNewSection();
//       dispatch({
//         type: "SET_SECTIONS",
//         payload: [...state.sections, newSection],
//       });
//     } else if (isEditMode && state.editingSection) {
//       const updatedSections = updateSection(state.sections);
//       dispatch({
//         type: "SET_SECTIONS",
//         payload: updatedSections,
//       });
//     }

//     closeModal();
//   };

//   // Handle keyboard events
//   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && canSubmit) {
//       handleSubmit();
//     }
//   };

//   // Handle input changes
//   const handleSectionNameChange = (value: string) => {
//     dispatch({ type: "SET_SECTION_NAME", payload: value });
//   };

//   const handleSectionDescriptionChange = (value: string) => {
//     dispatch({ type: "SET_SECTION_DESCRIPTION", payload: value });
//   };

//   // Handle dialog open change
//   const handleOpenChange = (open: boolean) => {
//     if (!open) {
//       closeModal();
//     }
//   };

//   const modalTitle = isAddMode ? "إضافة قسم جديد" : "تعديل القسم";
//   const submitButtonText = isAddMode ? "إضافة" : "تعديل";

//   return (
//     <Dialog open={state.showSectionModal} onOpenChange={handleOpenChange}>
//       <DialogContent showCloseButton={false}>
//         <DialogHeader>
//           <DialogTitle>{modalTitle}</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4">
//           <div>
//             <Label htmlFor="sectionName">اسم القسم</Label>
//             <Input
//               id="sectionName"
//               ref={sectionInputRef}
//               placeholder="اسم القسم"
//               value={state.sectionName}
//               onChange={(e) => handleSectionNameChange(e.target.value)}
//               onKeyDown={handleKeyDown}
//               autoFocus
//               className="mt-2"
//             />
//           </div>

//           <div>
//             <Label htmlFor="sectionDescription">وصف القسم</Label>
//             <Textarea
//               id="sectionDescription"
//               placeholder="وصف القسم"
//               value={state.sectionDescription}
//               onChange={(e) => handleSectionDescriptionChange(e.target.value)}
//               className="mt-2 min-h-[80px]"
//             />
//           </div>
//         </div>

//         {/* <form>
//           {getFormFields().map((field, index) => (
//             <div key={index} className="mb-4">
//               <FormFields
//                 {...field}
//                 control={control as Control<Record<string, unknown>>}
//                 errors={errors}
//               />
//             </div>
//           ))}
//           <Button type="submit" disabled={formLoading}>
//             {isSubmitting ? <Loader /> : submitButtonText}
//           </Button>
//         </form> */}

//         <DialogFooter>
//           <DialogClose asChild>
//             <Button type="button" variant="secondary">
//               إلغاء
//             </Button>
//           </DialogClose>
//           <Button type="button" onClick={handleSubmit} disabled={!canSubmit}>
//             {submitButtonText}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

function AddSectionModal() {
  return <div></div>;
}

export default AddSectionModal;
