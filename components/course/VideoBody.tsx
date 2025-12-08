import RichText from "@/components/RichText";

interface Props {
  description: string;
}

export function VideoBody({ description }: Props) {
  return (
    <div className="prose prose-2xl w-full max-w-none prose-p:text-xl prose-p:leading-relaxed prose-li:text-xl prose-headings:text-2xl md:prose-p:text-2xl md:prose-li:text-2xl md:prose-headings:text-3xl">
      {/* Description */}
      <div className="card bg-base-100 mb-8 !border !border-base-300">
        <div className="card-body text-lg md:text-xl">
          <RichText content={description} />
        </div>
      </div>
    </div>
  );
}
