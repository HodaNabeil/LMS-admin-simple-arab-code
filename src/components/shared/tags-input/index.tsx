
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import ReactTagsInput, { type RenderInputProps } from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const TagsInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) => {
  const [tag, setTag] = useState<string>("");
  const tagInputRef = useRef<ReactTagsInput>(null);

  const handleChange = (newTags: string[]) => {
    setTags(newTags);
  };

  const pasteSplit = (data: string): string[] => {
    const separators = ["::"];
    return data.split(new RegExp(separators.join("|"))).map((d) => d.trim());
  };

  const renderInput = (props: RenderInputProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onChange, value, addTag, ...other } = props;
    return (
      <Input
        id="tags"
        type="text"
        onChange={onChange}
        value={value}
        {...other}
        className="form-field  bg-white"
      />
    );
  };

  const onChangeInput = (inputTag: string) => {
    if (inputTag.endsWith("::")) {
      inputTag = inputTag.slice(0, -2);
      setTag(inputTag);
      tagInputRef.current?.accept();
    } else {
      setTag(inputTag);
    }
  };

  return (
    <ReactTagsInput
      ref={tagInputRef}
      value={tags}
      inputValue={tag}
      onChange={handleChange}
      addOnPaste={true}
      onChangeInput={onChangeInput}
      renderInput={renderInput}
      pasteSplit={pasteSplit}
      className="p-0"
    />
  );
};

export default TagsInput;
