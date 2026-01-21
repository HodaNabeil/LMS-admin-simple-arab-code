import { useParams } from "react-router-dom";
import { Loader } from "@/components/shared/loader";
import { useTrack } from "@/features/tracks/hooks/useTracksQueries";
import TrackForm from "@/features/tracks/components/form/TrackForm";
import { TrackFormHeader } from "@/features/tracks/components/form/TrackFormHeader";

function ManageTrack() {
  const { trackSlug } = useParams<{ trackSlug: string }>();
  // console.log(trackSlug);
  const { data: track, isPending, error, isError } = useTrack(trackSlug);

  console.log(track);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{ paddingTop: "5rem" }}
        className="flex justify-center items-center min-h-screen"
      >
        <div className="text-red-500">
          <p>Error loading track data. Please try again later.</p>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    !isPending &&
    track && (
      <main className="pt-20">
        <TrackFormHeader
          title="تعديل المسار"
          description="قم بتحديث معلومات المسار التعليمي"
        />
        <TrackForm trackData={track} />
      </main>
    )
  );
}

export default ManageTrack;
