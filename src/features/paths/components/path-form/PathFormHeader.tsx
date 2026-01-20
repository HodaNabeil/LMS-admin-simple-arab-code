interface PathFormHeaderProps {
    title: string;
    description: string;
    showAutoSave?: boolean;
}

/**
 * Displays the form header with title, description, and optional auto-save indicator
 */
export function PathFormHeader({ title, description, showAutoSave = false }: PathFormHeaderProps) {
    return (
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground">{description}</p>

            {showAutoSave && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>يتم حفظ البيانات تلقائياً</span>
                </div>
            )}
        </div>
    );
}
