import RichText from "@/components/RichText";

interface Props {
  description: string;
}

export function VideoBody({ description }: Props) {
  return (
    <div className="prose prose-lg max-w-4xl mx-auto">
      {/* Description */}
      <div className="card bg-base-100 mb-8 !border !border-base-300">
        <div className="card-body">
          <RichText content={description} />
        </div>
      </div>
    </div>
  );
}
