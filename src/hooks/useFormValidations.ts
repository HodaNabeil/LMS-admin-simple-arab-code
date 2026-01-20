import * as z from 'zod';
import { signinSchema, signupSchema } from '@/validations/auth';
import type { IFormFieldsVariables } from '@/types/app';
import { Pages } from '@/constants/enums';
import { loginSchema } from '@/validations/login';
import { userSchema } from '@/validations/user';
import { createPathSchema } from '@/validations/path';
import { createCourseSchema } from '@/validations/createcourse';
import {
  basicsSchema,
  createLessonCourseSchema,
  createSectionCourseSchema,
  goalsSchema,
  pricingSchema,
} from '@/validations/course';

type ValidationSchema =
  | typeof signinSchema
  | typeof signupSchema
  | typeof loginSchema
  | typeof userSchema
  | typeof createPathSchema
  | typeof createCourseSchema
  | typeof basicsSchema
  | typeof createSectionCourseSchema
  | typeof goalsSchema
  | typeof pricingSchema
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
      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
