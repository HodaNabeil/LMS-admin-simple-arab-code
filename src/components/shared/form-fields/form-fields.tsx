import { InputTypes } from "@/constants/enums";
import type { IFormField } from "@/types/app";
import PasswordField from "./password-field";
import SelectField from "./select-field";
import PhoneField from "./phone-field";
import type { Control, FieldErrors } from "react-hook-form";
import Checkbox from "./checkbox";
import ImageField from "./image-field";
import FileUploadField from "./file-upload-field";
import TextField from "./text-field";
import TextareaField from "./textarea-field";

interface Props extends IFormField {
  errors: FieldErrors;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Record<string, any>>;
  accept?: string;
  maxSize?: number;
  allowedTypes?: string[];
}

const FormFields = (props: Props) => {
  const { type } = props;

  const renderField = (): React.ReactNode => {
    if (type === InputTypes.PASSWORD) {
      return <PasswordField {...props} />;
    }

    if (type === InputTypes.CHECKBOX) {
      return <Checkbox {...props} />;
    }

    if (type === InputTypes.SELECT) {
      return <SelectField {...props} />;
    }

    if (type === InputTypes.PHONE) {
      return <PhoneField {...props} />;
    }

    if (type === InputTypes.IMAGE) {
      return <ImageField {...props} />;
    }

    if (type === InputTypes.TEXTAREA) {
      return <TextareaField {...props} />;
    }

    if (type === "file") {
      return <FileUploadField {...props} />;
    }

    return <TextField {...props} />;
  };

  return <>{renderField()}</>;
};

export default FormFields;
