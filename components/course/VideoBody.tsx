import type { Resource } from "@/types/course";
import RichText from "@/components/RichText";

interface Props {
  description: string;
  resources: Resource[];
}

export function VideoBody({ description, resources }: Props) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Description */}
      <div className="card bg-base-100 shadow-lg mb-8">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Beschreibung</h2>
          <RichText content={description} />
        </div>
      </div>

      {/* Resources */}
      {resources.length > 0 && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Ressourcen</h2>
            <div className="flex flex-wrap gap-3">
              {resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {resource.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
