import type { ColumnDef } from "@tanstack/react-table";
import { Star, MessageCircle, User, BookOpen, Clock, Globe, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { Review } from "@/types/reviews";
import { EditReview } from "../form/EditReview";
import { DeleteReview } from "./DeleteReview";

const statusMap = {
  approved: {
    label: "مقبول",
    variant: "default" as const,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  pending: {
    label: "قيد المراجعة",
    variant: "secondary" as const,
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  rejected: {
    label: "مرفوض",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return (
        <span className={cn('text-xs', 'text-muted-foreground', 'whitespace-nowrap')}>
          {id}
        </span>
      );
    },
  },
  {
    accessorKey: 'student',
    header: 'الطالب',
    cell: ({ row }) => {
      const student = row.original.student;
      return (
        <div className={cn('flex', 'items-center', 'gap-2')}>
          <Avatar className={cn('h-8', 'w-8')}>
            <AvatarImage src={student?.avatar || ''} alt={student?.name || ''} />
            <AvatarFallback><User className={cn('h-4', 'w-4')} /></AvatarFallback>
          </Avatar>
          <div className={cn('flex', 'flex-col')}>
            <span className="font-medium">{student?.name || '-'}</span>
            <span className={cn('text-xs', 'text-muted-foreground')}>{student?.id || '-'}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'course',
    header: 'الدورة',
    cell: ({ row }) => {
      const course = row.original.course;
      return (
        <div className={cn('flex', 'items-center', 'gap-2')}>
          <BookOpen className={cn('h-4', 'w-4', 'text-muted-foreground')} />
          <span className="text-sm">{course?.title || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: 'التقييم',
    cell: ({ row }) => {
      const ratingRaw = row.getValue('rating') as unknown;
      const rating = typeof ratingRaw === 'number' ? ratingRaw : 0;
      return (
        <div className={cn('flex', 'items-center', 'gap-1')}>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className={cn('text-sm', 'font-medium', 'mr-1')}>({rating})</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'comment',
    header: 'التعليق',
    cell: ({ row }) => {
      const comment = (row.getValue('comment') as string) || '-';
      const flagged = row.original.meta?.flagged;
      return (
        <div className={cn('max-w-75', 'flex', 'flex-col', 'gap-1')}>
          <div className={cn('flex', 'items-start', 'gap-2')}>
            <MessageCircle className={cn('h-4', 'w-4', 'mt-1', 'text-muted-foreground', 'shrink-0')} />
            <p className={cn('text-sm', 'line-clamp-2')} title={comment}>{comment}</p>
          </div>
          {flagged && (
            <div className={cn('flex', 'items-center', 'gap-1', 'text-[10px]', 'text-red-500', 'font-bold', 'uppercase')}>
              <ShieldAlert className={cn('h-3', 'w-3')} />
              تم التبليغ عنه
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusMap;
      const config = statusMap[status] || statusMap.pending;
      return (
        <Badge variant={config.variant} className={config.className}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'instructorReply',
    header: 'رد المدرب',
    cell: ({ row }) => {
      const reply = row.original.instructorReply;
      if (!reply?.message) {
        return (
          <span className={cn('text-xs', 'text-muted-foreground')}>-</span>
        );
      }

      return (
        <div className={cn('max-w-75', 'flex', 'flex-col', 'gap-1')}>
          <p className={cn('text-sm', 'line-clamp-2')} title={reply.message}>
            {reply.message}
          </p>
          {reply.createdAt && (
            <span className={cn('text-[10px]', 'text-muted-foreground', 'whitespace-nowrap')}>
              {format(new Date(reply.createdAt), 'PPP', { locale: ar })}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'التاريخ',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string;
      const date = createdAt ? new Date(createdAt) : null;
      return (
        <div className={cn('flex', 'items-center', 'gap-2', 'text-muted-foreground', 'whitespace-nowrap')}>
          <Clock className={cn('h-4', 'w-4')} />
          <span className="text-xs">{date ? format(date, 'PPP', { locale: ar }) : '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'meta',
    header: 'تفاصيل إضافية',
    cell: ({ row }) => {
      const meta = row.original.meta;
      return (
        <div className={cn('flex', 'flex-col', 'gap-1', 'text-[11px]', 'text-muted-foreground')}>
          <div className={cn('flex', 'items-center', 'gap-1')}>
            <Globe className={cn('h-3', 'w-3')} />
            <span>المصدر: {meta?.source === 'web' ? 'المتصفح' : meta?.source ? 'التطبيق' : '-'}</span>
          </div>
          <div className={cn('flex', 'items-center', 'gap-1')}>
            <span className={cn('font-medium', 'text-blue-600')}>نسبة الإكمال: {meta?.completionRate ?? '-'}%</span>
          </div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'الإجراءات',
    enableHiding: false,
    cell: ({ row }) => {
      const review = row.original;

      return (
        <div className={cn('flex', 'gap-2', 'items-center')}>
          <EditReview review={review} />
          <DeleteReview reviewId={review.id} />
        </div>
      );
    },
  },

];