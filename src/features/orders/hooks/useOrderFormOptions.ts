import { useMemo } from "react";
import { useCourses } from "@/features/courses/hooks/useCoursesQueries";
import { useUsers } from "@/features/users/hooks/useUsersQueries";
import { useCoupons } from "@/features/courses/manage/promotions/hooks/useCouponsQueries";
import {
  getCurrencyOptions,
  getCourseOptions,
  getUserOptions,
  getCouponOptions,
} from "../services/orderOptions";

export function useOrderFormOptions() {
  const { data: coursesData, isPending: isPendingCourses } = useCourses({
    search: "",
    limit: 50,
  });

  const { data: usersData, isPending: isPendingUsers } = useUsers({
    search: "",
  });

  const { data: couponsData, isPending: isPendingCoupons } =
    useCoupons("");

  const currencyOptions = useMemo(() => getCurrencyOptions(), []);
  const courseOptions = useMemo(() => getCourseOptions(coursesData?.data?.courses || []), [coursesData?.data?.courses]);
  const userOptions = useMemo(() => getUserOptions(usersData?.data?.users ?? []), [usersData?.data?.users]);
  const couponOptions = useMemo(() => getCouponOptions(couponsData?.data ?? []), [couponsData?.data]);

  return {
    currencyOptions,
    courseOptions,
    userOptions,
    couponOptions,
    isPending: isPendingCourses || isPendingUsers || isPendingCoupons,
  };
}
