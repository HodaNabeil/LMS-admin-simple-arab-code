
interface PathFormStepsProps {
    currentStep: number;
    totalSteps: number;
}

export const PathFormSteps = ({ currentStep, totalSteps }: PathFormStepsProps) => {
    if (totalSteps <= 1) return null;

    return (
        <div className="flex items-center justify-center mb-8">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div key={index + 1} className="flex items-center">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= index + 1
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                    >
                        {index + 1}
                    </div>
                    {index < totalSteps - 1 && (
                        <div
                            className={`w-16 h-1 mx-2 ${currentStep > index + 1 ? "bg-primary" : "bg-muted"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};
