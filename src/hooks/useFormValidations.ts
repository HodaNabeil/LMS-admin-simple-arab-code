import * as z from 'zod';
import { createReviewSchema } from '@/validations/review';
import type { IFormFieldsVariables } from '@/types/app';
import { Pages } from '@/constants/enums';
import { createTrackSchema } from '@/validations/track';
import {
  basicsSchema,
  createLessonCourseSchema,
  createSectionCourseSchema,
  goalsSchema,
  pricingSchema,
} from '@/validations/course';
import { couponSchema } from '@/validations/coupon';
import { createPaymentSchema } from '@/validations/payment';
import { signinSchema, signupSchema } from '@/validations/auth';
import { loginSchema } from '@/validations/login';
import { userSchema } from '@/validations/user';
import { createPathSchema } from '@/validations/path';
import { createCourseSchema } from '@/validations/createcourse';
import { orderSchema } from '@/validations/order';

type ValidationSchema =
  | typeof signinSchema
  | typeof signupSchema
  | typeof loginSchema
  | typeof userSchema
  | typeof createPathSchema
  | typeof createCourseSchema
  | typeof createTrackSchema
  | typeof basicsSchema
  | typeof createSectionCourseSchema
  | typeof goalsSchema
  | typeof pricingSchema
  | typeof couponSchema
  | typeof createPaymentSchema
  | typeof createLessonCourseSchema
  | typeof createReviewSchema
  | typeof orderSchema
  | z.ZodObject<Record<string, never>>;

const useFormValidations = (
  props: IFormFieldsVariables
): {
  getValidationSchema: () => ValidationSchema;
} => {
  const { slug } = props;

  const getValidationSchema = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinSchema;
      case Pages.SIGNUP:
        return signupSchema;
      case Pages.USERS:
        return userSchema;
      case Pages.LOGIN:
        return loginSchema;

      case Pages.PATHS:
        return createPathSchema;
      case Pages.CREATE_TRACKS:
        return createTrackSchema;
      case Pages.CREATE_COURSES:
        return createCourseSchema;
      case Pages.GOALS:
        return goalsSchema;
      case Pages.BASICS:
        return basicsSchema;
      case Pages.PRICING:
        return pricingSchema;
      case Pages.CURRICULUM:
        return createSectionCourseSchema;

      case Pages.LESSONS:
        return createLessonCourseSchema;
      case Pages.COUPONS:
        return couponSchema;
      case Pages.CREATE_REVIEWS:
        return createReviewSchema;
      case Pages.CREATE_PAYMENTS:
        return createPaymentSchema;
      case Pages.CREATE_ORDERS:
        return orderSchema;
      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
