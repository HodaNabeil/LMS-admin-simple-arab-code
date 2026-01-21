import type { Path } from "@/types/path";
import { PathFormContainer } from "./path-form/PathFormContainer";

interface PathFormProps {
  pathData?: Path;
}

const PathForm = ({ pathData }: PathFormProps) => {
  return <PathFormContainer pathData={pathData} />;
};

export default PathForm;
