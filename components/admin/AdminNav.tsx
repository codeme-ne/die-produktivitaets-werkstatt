import Link from "next/link";

interface Props {
  active: "videos" | "lessons";
}

const NAV_ITEMS = [
  { href: "/dashboard/admin/videos", label: "Videos", key: "videos" },
  { href: "/dashboard/admin/lessons", label: "Lektionen", key: "lessons" },
] as const;

export default function AdminNav({ active }: Props) {
  return (
    <nav className="mb-8">
      <ul className="flex flex-wrap gap-3">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`btn btn-sm ${
                  isActive
                    ? "btn-primary"
                    : "btn-outline btn-primary"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
