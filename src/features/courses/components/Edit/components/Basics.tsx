import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const levels = [
  { value: "beginner", label: "مبتدئ" },
  { value: "intermediate", label: "متوسط" },
  { value: "advanced", label: "متقدم" },
];

export default function Basics() {
  const { slug } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    slug: slug || "",
    level: "beginner",
    duration: "",
    image: null as File | null,
    video: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files![0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, level: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // تجهيز البيانات للإرسال إلى API
    // مثال: console.log(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <Label htmlFor="name">اسم الدورة</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="description">وصف الدورة</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="mt-2 min-h-[70px]"
          />
        </div>
        <div>
          <Label htmlFor="slug">رابط الدورة (slug)</Label>
          <Input
            id="slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            readOnly
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="level">مستوى الدورة</Label>
          <Select value={form.level} onValueChange={handleSelectChange}>
            <SelectTrigger id="level" className="mt-2">
              <SelectValue placeholder="اختر المستوى" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="duration">مدة الدورة (بالساعات)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            min={1}
            required
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="image">صورة الدورة</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="video">فيديو ترويجي</Label>
          <Input
            id="video"
            name="video"
            type="file"
            accept="video/*"
            onChange={handleChange}
            className="mt-2"
          />
        </div>
        <Button type="submit" className="mt-4" variant="default" size="lg">
          إرسال البيانات
        </Button>
      </form>
    </>
  );
}
