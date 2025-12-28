import { NavLink, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function ManageSidebar() {
  const { slug } = useParams();


  const links = [
    {
      title: "خطط لدورتك",
      items: [
        {
          label: "المتعلمون المستهدفون",
          href: `/admin/courses/${slug}/manage/goals`,
        },
      ],
    },
    {
      title: "أنشئ المحتوى الخاص بك",
      items: [
        {
          label: "المنهج",
          href: `/admin/courses/${slug}/manage/curriculum`,
        },
        {
          label: "التوفر",
          href: `/admin/courses/${slug}/manage/availability`,
        },
      ],
    },
    {
      title: "انشر دورتك",
      items: [
        {
          label: "صفحة هبوط الدورة",
          href: `/admin/courses/${slug}/manage/basics`,
        },
        {
          label: "التسعير",
          href: `/admin/courses/${slug}/manage/pricing`,
        },
        {
          label: "العروض الترويجية",
          href: `/admin/courses/${slug}/manage/promotions`,
        },
      ],
    },
  ];

  return (
    <aside className="w-[20%] min-h-full p-6 flex flex-col gap-8 border-l">
      {links.map((section, index) => (
        <div key={index}>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            {section.title}
          </h2>
          <ul className="space-y-1">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <NavLink
                  to={item.href}

                  className={({ isActive }) =>
                    cn(
                      `block px-2 py-1.5 text-sm font-medium transition-colors rounded-md
                        ${isActive ? "text-primary !bg-blue-50" : "text-gray-600 hover:text-primary hover:bg-gray-50"}`,
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="mt-auto">
        <button className="w-full bg-primary text-white rounded py-2 text-sm font-semibold shadow hover:bg-primary/90 transition">
          Publish
        </button>
      </div>
    </aside>
  );
}
