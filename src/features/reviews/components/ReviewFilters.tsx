import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface ReviewFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedRating: string;
  onRatingChange: (rating: string) => void;
  onClearFilters: () => void;
}

function ReviewFilters({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedRating,
  onRatingChange,
  onClearFilters,
}: ReviewFiltersProps) {
  const statuses = [
    { label: "الكل", value: "all" },
    { label: "مقبول", value: "approved" },
    { label: "قيد المراجعة", value: "pending" },
    { label: "مرفوض", value: "rejected" },
  ];

  const ratings = [
    { label: "الكل", value: "all" },
    { label: "5 نجوم", value: "5" },
    { label: "4 نجوم", value: "4" },
    { label: "3 نجوم", value: "3" },
    { label: "2 نجوم", value: "2" },
    { label: "نجمة واحدة", value: "1" },
  ];

  const hasActiveFilters =
    searchTerm ||
    selectedStatus !== "all" ||
    selectedRating !== "all";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة المراجعات</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            مسح الفلاتر
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في التعليقات أو الطلاب..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Rating Filter */}
        <Select value={selectedRating} onValueChange={onRatingChange}>
          <SelectTrigger>
            <SelectValue placeholder="التقييم" />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((rating) => (
              <SelectItem key={rating.value} value={rating.value}>
                {rating.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm font-medium text-gray-600">
            الفلاتر النشطة:
          </span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              البحث: {searchTerm}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onSearchChange("")}
              />
            </Badge>
          )}
          {selectedStatus !== "all" && (
            <Badge variant="secondary" className="gap-1">
              الحالة: {statuses.find(s => s.value === selectedStatus)?.label}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onStatusChange("all")}
              />
            </Badge>
          )}
          {selectedRating !== "all" && (
            <Badge variant="secondary" className="gap-1">
              التقييم: {ratings.find(r => r.value === selectedRating)?.label}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onRatingChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewFilters;
