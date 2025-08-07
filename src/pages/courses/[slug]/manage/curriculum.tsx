export default function Curriculum() {
  return (
    <div className=" flex flex-col items-center  h-[calc(100vh-200px)] bg-gray-50 p-8 ">
      <h2 className="text-xl font-bold mb-8 text-[#3c45aa] self-start text-right">
        مقرر الدورة
      </h2>
      <div className="space-y-8 w-full ">
        {/* {state.sections.map((section, idx) => (
          <CreateSection
            key={section.id}
            section={section}
            idx={idx}
            dispatch={dispatch}
            state={state}
          />
        ))} */}
      </div>
      <div className="flex items-center gap-2 mt-8 self-start ">
        {/* <AddSection /> */}
      </div>

      {/* <AddSectionModal /> */}
      {/* <DeleteSectionModal state={state} dispatch={dispatch} /> */}

      {/* <CreateLessonModal
        state={state}
        dispatch={dispatch}
        randomId={randomId}
      /> */}
      {/* <DeleteLessonModal state={state} dispatch={dispatch} /> */}
      {/* <UploadVideoModal state={state} dispatch={dispatch} /> */}
    </div>
  );
}
