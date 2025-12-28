"use client";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import ReactTagsInput, { type RenderInputProps } from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const TagsInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
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
    const { onChange, value, ...other } = props;
    return (
      <Input
        id="tags"
        type="text"
        onChange={onChange}
        value={value}
        {...other}
        className="form-field  bg-[#1e293b]"
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
