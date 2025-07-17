import { Link, useParams } from "react-router-dom";

export default function Sidebar() {
  const sluge = useParams();
  return (
    <aside className=" w-[20%]  min-h-full p-6 flex flex-col gap-4   ">
      {/* Plan your course */}
      <div>
        <h2 className="text-base font-bold    text-gray-600">
          Plan your course
        </h2>
        <ul className="">
          <li>
            <Link
              to={`/admin/courses/${sluge.slug}/manage/goals`}
              className="text-primary hover:underline text-sm font-medium"
            >
              Intended learners
            </Link>
          </li>
        </ul>
      </div>
      {/* Create your content */}
      <div>
        <h2 className="text-base font-bold  mb-2  text-gray-600">
          Create your content
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              to={`/admin/courses/${sluge.slug}/manage/curriculum`}
              className="text-gray-600 hover:text-primary text-sm"
            >
              Curriculum
            </Link>
          </li>
          <li>
            <Link
              to={`/admin/courses/${sluge.slug}/manage/availability`}
              className="text-gray-600 hover:text-primary text-sm"
            >
              Availability
            </Link>
          </li>
        </ul>
      </div>
      {/* Publish your course */}
      <div>
        <h2 className="text-base font-bold  mb-2  text-gray-600">
          Publish your course
        </h2>
        <ul className="space-y-1">
          <li>
            <Link to="#" className="text-gray-600  hover:text-primary text-sm">
              Course landing page
            </Link>
          </li>
          <li>
            <Link
              to={`/admin/courses/${sluge.slug}/manage/pricing`}
              className="text-gray-600  hover:text-primary text-sm"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              to={`/admin/courses/${sluge.slug}/manage/promotions`}
              className="text-gray-600  hover:text-primary text-sm"
            >
              Promotions
            </Link>
          </li>
        </ul>
      </div>
      {/* Publish Button */}
      <div className="mt-auto">
        <button className="w-full bg-primary text-white rounded py-2 text-sm font-semibold shadow hover:bg-primary/90 transition">
          Publish
        </button>
      </div>
    </aside>
  );
}
