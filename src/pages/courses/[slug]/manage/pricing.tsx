import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import PricingForm from "@/features/courses/manage/components/pricing/PricingForm";
import { useParams } from "react-router-dom";

function Pricing() {

  const { slug } = useParams<{ slug: string }>();
  const { data: courseResponse, isPending, error, isError } = useCourse(slug as string);


  if (isPending) return <div><Loader /></div>;
  if (isError && error) return <div>{error.message}</div>;
  return !isPending && courseResponse ? (
    <main>
      <h2 className="md:text-xl      lg:text-2xl   font-bold text-primary ">
        اضافة السعر
      </h2>
      <PricingForm
        price={courseResponse?.data.course.price}
        compareAtPrice={courseResponse?.data.course.compareAtPrice}
      />
    </main>
  ) : null;
}

export default Pricing;
