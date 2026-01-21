import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/shared/loader";
import type { ReactNode } from "react";

export interface ConfirmDialogProps {
    trigger: ReactNode;
    title: string;
    description: string;
    actionLabel: string;
    onConfirm: () => void | Promise<void>;
    isLoading?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    variant?: "default" | "destructive";
}


export function ConfirmDialog({
    trigger,
    title,
    description,
    actionLabel,
    onConfirm,
    isLoading = false,
    open,
    onOpenChange,
    variant = "default",
}: ConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="!text-right">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Button
                    type="button"
                    variant={variant}
                    disabled={isLoading}
                    onClick={onConfirm}
                >
                    {actionLabel}
                    {isLoading && <Loader />}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
