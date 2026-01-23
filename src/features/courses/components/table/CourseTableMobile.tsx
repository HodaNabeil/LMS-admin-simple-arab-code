import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import type { Table as TableType } from '@tanstack/react-table';
import type { Course } from '@/types/course';

interface CourseTableMobileProps {
    table: TableType<Course>;
}

export function CourseTableMobile({ table }: CourseTableMobileProps) {
    return (
        <div className="block lg:hidden space-y-4">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <div
                        key={row.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
                    >
                        <div className="flex items-start gap-3">
                            <img
                                src={row.getValue('thumbnailUrl')}
                                alt={row.getValue('title')}
                                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                                    {row.getValue('title')}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1 text-right">
                                    {row.getValue('instructorId')}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-blue-600"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end">

                            <Badge
                                className={`text-xs ${row.getValue('level') === 'BEGINNER'
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

                        <div className="flex justify-end pt-2 border-t">
                            <div className="text-sm font-medium">
                                {parseFloat(row.getValue('price')) === 0
                                    ? 'مجاني'
                                    : `${row.getValue('price')} ر.س`}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    لا توجد نتائج.
                </div>
            )}
        </div>
    );
}
