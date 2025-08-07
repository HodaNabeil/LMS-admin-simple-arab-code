import * as z from "zod";
import { signinSchema, signupSchema } from "@/validations/auth";
import type { IFormFieldsVariables } from "@/types/app";
import { Pages } from "@/constants/enums";
import { loginSchema } from "@/validations/login";
import { userSchema } from "@/validations/user";
import { pathSchema } from "@/validations/path";
import { createCourseSchema } from "@/validations/createcourse";
import { goalsSchema } from "@/validations/goals";
import {
  basicsSchema,
  createSectionCourseSchema,
  pricingSchema,
} from "@/validations/course";

const useFormValidations = (props: IFormFieldsVariables) => {
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
        return pathSchema;
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
      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
