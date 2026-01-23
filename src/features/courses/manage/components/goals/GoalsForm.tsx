import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { useEffect } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import useFormFields from '@/hooks/useFormFields';
import { Pages } from '@/constants/enums';
import { useCourseManageStore, type OptionType } from '@/features/courses/manage/store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { goalsSchema, type GoalsSchema } from '@/validations/course';
import TagsInput from '@/components/shared/tags-input';

const courseOptions: OptionType[] = [
  { value: 'react', label: 'Mastering ReactJS: Build Dynamic Web Apps' },
  { value: 'nodejs', label: 'NodeJS' },
  { value: 'html', label: 'Learn HTML in 5 mins' },
  { value: 'hoda', label: 'Hoda Course' },
];

export default function GoalsForm() {
  const { getFormFields } = useFormFields({ slug: Pages.GOALS });

  const {
    whatYouWillLearn,
    selectedCourses,
    audienceTags,
    knowledgeNeeded,
    setWhatYouWillLearn,
    setSelectedCourses,
    setAudienceTags,
    setKnowledgeNeeded
  } = useCourseManageStore();

  console.log(selectedCourses)

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<GoalsSchema>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      knowledgeNeeded: knowledgeNeeded || '',
    },
    mode: 'onChange',
  });
  const onSubmit = (data: GoalsSchema) => {
    console.log('Form submitted with data:', data);
  };

  const knowledgeNeededValue = watch('knowledgeNeeded');

  useEffect(() => {
    console.log('knowledgeNeededValue type:', typeof knowledgeNeededValue);
    console.log('knowledgeNeededValue value:', knowledgeNeededValue);
    setKnowledgeNeeded(knowledgeNeededValue || '');
  }, [knowledgeNeededValue, setKnowledgeNeeded]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          ما ستتعلمه
        </Label>
        <TagsInput
          tags={whatYouWillLearn}
          setTags={setWhatYouWillLearn}
        />
      </div>

      {getFormFields().map((field) => (
        <div className="mb-3" key={field.name}>
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}

      <div className="mb-6">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          اختر دورة يجب تعلمها أولًا
        </Label>

        <Select
          options={courseOptions}
          isMulti
          value={selectedCourses}
          onChange={(newValue, actionMeta) => {
            let updatedOptions = newValue as OptionType[];
            if (actionMeta.action === 'select-option' && actionMeta.option) {
              const newOption = actionMeta.option as OptionType;
              updatedOptions = [
                newOption,
                ...updatedOptions.filter((o) => o.value !== newOption.value),
              ];
            }
            setSelectedCourses(updatedOptions);
          }}

          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="اختر..."
        />
      </div>
      <div className="mb-4">
        <Label className="text-sm font-medium text-card-foreground mb-2 block">
          لمن هذه الدورة
        </Label>
        <TagsInput
          tags={audienceTags}
          setTags={setAudienceTags}
        />
      </div>
    </form>
  );
}
