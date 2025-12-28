import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

interface ExistingPDFDisplayProps {
    fileUrl: string;
    fileName: string;
}

export const ExistingPDFDisplay = ({
    fileUrl,
    fileName,
}: ExistingPDFDisplayProps) => {
    return (
        <div className="mb-4 p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-red-600">PDF</span>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-muted-foreground">
                            ملف PDF الحالي:
                        </span>
                        <p className="text-sm text-foreground">{fileName}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(fileUrl, "_blank")}
                    >
                        <Eye className="w-4 h-4 mr-1" />
                        عرض
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            const link = document.createElement("a");
                            link.href = fileUrl;
                            link.download = fileName;
                            link.click();
                        }}
                    >
                        <Download className="w-4 h-4 mr-1" />
                        تحميل
                    </Button>
                </div>
            </div>
        </div>
    );
};
