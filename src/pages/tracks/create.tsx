import { TrackFormHeader } from "@/features/tracks/components/track-form/TrackFormHeader";
import TrackForm from "@/features/tracks/components/TrackForm";

export default function CreateNewTrack() {
  return (
    <main className="pt-20">
      <TrackFormHeader title="انشاء تراك جديد" description="املأ التفاصيل الأساسية لتراك التعلمي. 
      "
      />

      <TrackForm />
    </main>
  );
}
