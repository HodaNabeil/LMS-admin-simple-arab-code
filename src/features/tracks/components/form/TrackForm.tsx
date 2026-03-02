import { Pages } from '@/constants/enums';
import { useNavigate } from 'react-router-dom';
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect } from 'react';
import FormFields from '@/components/shared/form-fields/form-fields';
import { Loader } from '@/components/shared/loader';
import useFormFields from '@/hooks/useFormFields';
import useFormValidations from '@/hooks/useFormValidations';
import { createTrackSchema, type ITrackForm } from '@/validations/track';
import { useCreateTrack, useUpdateTrack } from '../../hooks/useTracksMutations';
import { usePaths } from '@/features/paths/hooks/usePathsQueries';
import type { UpdateTrackRequest, CreateTrackRequest, Track } from '@/types/tracks';
import { handleApiError } from '@/lib/error-handler';
import { cn } from "../../../../lib/utils";

interface TrackFormProps {
  trackData?: Track;
}

export default function TrackForm({ trackData }: TrackFormProps) {
  const track = trackData;
  const isEditMode = !!track;

  const { getFormFields } = useFormFields({ slug: Pages.CREATE_TRACKS });
  const { getValidationSchema } = useFormValidations({
    slug: Pages.CREATE_TRACKS,
  });
  const navigate = useNavigate();
  const { data: pathsData, isPending: isLoadingPaths } = usePaths();

  const pathOptions = useMemo(() => {
    if (!pathsData?.data?.paths) return [];
    return pathsData.data.paths.map((path) => ({
      value: path.id.toString(),
      label: path.title || path.slug,
    }));
  }, [pathsData]);

  const { mutateAsync: createTrack } = useCreateTrack();
  const { mutateAsync: updateTrack } = useUpdateTrack();

  const useFormReturn = useForm<ITrackForm>({
    defaultValues: {
      slug: track?.slug || '',
      pathId: track?.pathId || '',
      title: track?.title || '',
      summary: track?.summary || '',
      description: track?.description || '',
      category: track?.category as unknown as ITrackForm['category'],
    },
    mode: 'onChange',
    resolver: zodResolver(getValidationSchema() as typeof createTrackSchema),
  });

  const { reset } = useFormReturn;

  // Initialize form with API data when it arrives
  useEffect(() => {
    if (track) {
      reset({
        slug: track.slug || '',
        pathId: track.pathId || '',
        title: track.title || '',
        summary: track.summary || '',
        description: track.description || '',
        category: track.category as unknown as ITrackForm['category'],
      });
    }
  }, [track, reset]);


  const handleFormSubmit = async (data: ITrackForm) => {
    try {
      if (isEditMode && track) {
        const updateData: UpdateTrackRequest = {
          slug: data.slug,
          pathId: data.pathId,
          title: data.title,
          summary: data.summary,
          description: data.description,
          category: data.category as unknown as UpdateTrackRequest['category'],
          isPublished: track.isPublished ?? true,
          sortOrder: track.sortOrder ?? 0,
        };
        await updateTrack({
          slug: track.slug,
          data: updateData,
        });
      } else {
        await createTrack(data as CreateTrackRequest);
      }

      navigate('/admin/tracks');
    } catch (error) {
      handleApiError(error);
    }
  };

  const { handleSubmit, control, formState: { errors, isSubmitting } } = useFormReturn;

  return (
    <div className={cn('max-w-3xl', 'mx-auto', 'p-6', 'bg-card', 'rounded-lg', 'border', 'shadow-sm', 'my-6')}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn('flex', 'flex-col', 'gap-4')}
      >
        {getFormFields().map((field) => {
          // Inject dynamic path options into the pathId field
          const fieldWithOptions =
            field.name === 'pathId'
              ? { ...field, options: pathOptions }
              : field;

          return (
            <FormFields
              key={field.name}
              {...fieldWithOptions}
              control={control as unknown as Control<Record<string, unknown>>}
              errors={errors}
            />
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting || isLoadingPaths}
          className={cn('bg-primary', 'text-white', 'rounded', 'px-4', 'py-2', 'text-sm', 'hover:bg-primary/90', 'transition', 'disabled:opacity-50', 'flex', 'items-center', 'justify-center', 'gap-2')}
        >
          {isSubmitting ? (
            <Loader />
          ) : isEditMode ? (
            'تحديث التراك'
          ) : (
            'إضافة تراك'
          )}
        </button>
      </form>
    </div>
  );
}
