import ReviewFormHeader from '@/features/reviews/components/form/ReviewFormHeader';
import ReviewForm from '@/features/reviews/components/form/ReviewForm';

export default function CreateReview() {
  return (
    <div className='padding-page  space-y-10 pt-10'>
      <ReviewFormHeader title="إنشاء مراجعة جديدة" description="املأ التفاصيل الأساسية للمراجعة." />
      <ReviewForm />
    </div>
  );
}
