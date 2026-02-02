import { Badge } from '@/components/ui/badge';
import { Edit, Image as ImageIcon } from 'lucide-react';
import type { Table as TableType } from '@tanstack/react-table';
import type { Course } from '@/types/course';
import { Link } from 'react-router-dom';
import DeleteCourse from '../DeleteCourse';

interface CourseTableMobileProps {
    table: TableType<Course>;
}

export function CourseTableMobile({ table }: CourseTableMobileProps) {
    return (
        <div className="block lg:hidden space-y-4">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                    const slug = row.original.slug;
                    const title = row.original.title;
                    const status = row.getValue('status') as string;
                    const visibility = row.getValue('visibility') as string;
                    const statusLabels: Record<string, string> = { PUBLISHED: 'منشور', DRAFT: 'مسودة', ARCHIVED: 'مؤرشف' };
                    const visibilityLabels: Record<string, string> = { PUBLIC: 'عام', PRIVATE: 'خاص', UNLISTED: 'غير مدرج' };

                    return (
                        <div
                            key={row.id}
                            className="bg-white rounded-lg border border-gray-200 p-4 space-y-4"
                        >
                            <div className="flex items-start gap-3">
                                {row.getValue('thumbnailUrl') ? (
                                    <img
                                        src={row.getValue('thumbnailUrl')}
                                        alt={title}
                                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <ImageIcon className="h-8 w-8 text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base leading-tight line-clamp-2 text-right">
                                        {title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 text-right">
                                        ID: {row.original.id}
                                    </p>
                                    <p className="text-xs text-muted-foreground text-right">
                                        Slug: {slug}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to={`/admin/courses/${slug}/manage/basics`}
                                        className="inline-flex items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 text-blue-600 border border-gray-100 shadow-sm"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <DeleteCourse courseSlug={slug} courseTitle={title} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm border-t pt-4">
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">الحالة</span>
                                    <Badge variant="outline" className="mt-1">{statusLabels[status] || status}</Badge>
                                </div>
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">الظهور</span>
                                    <Badge variant="secondary" className="mt-1 font-normal">{visibilityLabels[visibility] || visibility}</Badge>
                                </div>
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">المستوى</span>
                                    <Badge
                                        className={`mt-1 text-xs ${row.getValue('level') === 'BEGINNER'
                                            ? 'bg-green-100 text-green-800'
                                            : row.getValue('level') === 'INTERMEDIATE'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : row.getValue('level') === 'ADVANCED'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {row.getValue('level') === 'BEGINNER' ? 'مبتدئ' :
                                            row.getValue('level') === 'INTERMEDIATE' ? 'متوسط' :
                                                row.getValue('level') === 'ADVANCED' ? 'متقدم' : row.getValue('level')}
                                    </Badge>
                                </div>
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">المدة</span>
                                    <div className="mt-1 font-medium">{row.getValue('hours') || 0} س</div>
                                </div>
                                {/* <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">المسار / التتابع</span>
                                    <div className="mt-1 text-xs truncate" title={row.original?.pathId}>{row.original?.pathId.split('-')[0]}... / {row.original?.trackId?.split('-')[0] || '---'}</div>
                                </div> */}
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">مميز / شهادة</span>
                                    <div className="mt-1">{row.original.isFeatured ? '✅' : '❌'} / {row.original.certificateEnabled ? '✅' : '❌'}</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">تاريخ الإنشاء</span>
                                    <div className="mt-1 text-xs">{new Date(row.original.createdAt).toLocaleDateString('ar-SA')}</div>
                                </div>
                                <div className="text-right">
                                    <span className="text-muted-foreground block text-xs">آخر تحديث</span>
                                    <div className="mt-1 text-xs">{new Date(row.original.updatedAt).toLocaleDateString('ar-SA')}</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t">
                                <div className="text-xs text-muted-foreground">
                                    أقصى طلاب: {row.original.maxStudents || '∞'}
                                </div>
                                <div className="flex flex-col items-end">
                                    {parseFloat(row.getValue('price')) === 0 ? (
                                        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors py-1 px-3">مجاني</Badge>
                                    ) : (
                                        <div className="flex flex-col items-end">
                                            <span className="text-xl font-bold text-blue-700">
                                                {row.getValue('price')}
                                                <span className="text-xs font-normal text-muted-foreground mr-1">{row.original.currency || 'ر.س'}</span>
                                            </span>
                                            {row.original.compareAtPrice && row.original.compareAtPrice > (row.original.price || 0) && (
                                                <span className="text-xs text-muted-foreground line-through opacity-60">
                                                    {row.original.compareAtPrice} {row.original.currency || 'ر.س'}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    لا توجد نتائج.
                </div>
            )}
        </div>
    );
}
