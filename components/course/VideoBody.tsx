import RichText from "@/components/RichText";

interface Props {
  description: string;
}

export function VideoBody({ description }: Props) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Description */}
      <div className="card bg-base-100 shadow-lg mb-8">
        <div className="card-body">
          <RichText content={description} />
        </div>
      </div>

      {/* Ressourcen-Sektion entfernt (Links stehen im Inhalt) */}
    </div>
  );
}
