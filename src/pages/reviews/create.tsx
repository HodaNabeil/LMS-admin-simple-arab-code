import ReviewFormHeader from '@/features/reviews/components/form/ReviewFormHeader';
import ReviewForm from '@/features/reviews/components/form/ReviewForm';

export default function CreateReview() {
  return (
    <main className="pt-20">
      <ReviewFormHeader title="إنشاء مراجعة جديدة" description="املأ التفاصيل الأساسية للمراجعة." />
      <ReviewForm />
    </main>
  );
}
