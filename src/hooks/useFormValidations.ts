import * as z from "zod";
import { signinSchema, signupSchema } from "@/validations/auth";
import type { IFormFieldsVariables } from "@/types/app";
import { Pages } from "@/constants/enums";
import { loginSchema } from "@/validations/login";
import { userSchema } from "@/validations/user";
import { PathSchema } from "@/validations/path";

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
        return PathSchema;
      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
