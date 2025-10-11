import { ReactNode } from 'react';

export default function CourseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200">
      {children}
    </div>
  );
}
