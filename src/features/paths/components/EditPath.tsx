import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import type { Path } from "@/types/path";
import { Directions } from "@/constants/enums";

export function EditPath({ path }: { path: Path }) {
  const [formData, setFormData] = useState(path);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call update mutation here
    console.log("Updated Path Data:", formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="h-4 w-4 cursor-pointer text-gray-600 hover:text-black" />
      </DialogTrigger>
      <DialogContent dir={Directions.RTL} className="sm:max-w-[500px]">
        <DialogHeader className="text-right">
          <DialogTitle>تعديل المسار التعليمي</DialogTitle>
          <DialogDescription>
            قم بتعديل بيانات المسار ثم اضغط على "حفظ".
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label> عنوان المسار (المختصر)</Label>
            <Input
              name="name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label> (بالتفاصيل)الوصف</Label>
            <Input
              name="description"
              //   value={formData.description}
              //   onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>رابط المسار</Label>
            <Input
              name="slug"
            //   value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>النوع</Label>
            <Input
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>المستوى</Label>
            <Input
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>المدرب</Label>
            <Input
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>الصورة (رابط)</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            حفظ التعديلات
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
