import ReviewForm from '@/features/reviews/components/form/ReviewForm';
import { cn } from "../../lib/utils";
import { useParams } from 'react-router-dom';

export default function CreateReview() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className={cn('padding-page', 'space-y-10', 'pt-10')}>
      <ReviewForm courseSlug={slug} />
    </div>
  );
}
