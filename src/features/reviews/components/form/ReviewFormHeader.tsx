interface ReviewFormHeaderProps {
  title: string;
  description: string;
}

export default function ReviewFormHeader({ title, description }: ReviewFormHeaderProps) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
