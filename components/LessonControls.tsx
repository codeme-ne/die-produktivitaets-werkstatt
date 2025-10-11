'use client';

import { useState, useTransition } from 'react';
import { completeLessonAction, undoLessonAction } from '@/app/actions';

interface LessonControlsProps {
  slug: string;
  isCompleted: boolean;
}

export default function LessonControls({ slug, isCompleted: initialCompleted }: LessonControlsProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleToggleCompletion = () => {
    setError(null);

    startTransition(async () => {
      const action = isCompleted ? undoLessonAction : completeLessonAction;
      const result = await action(slug);

      if (result.success) {
        setIsCompleted(!isCompleted);
      } else {
        setError(result.error || 'Ein Fehler ist aufgetreten');
      }
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={handleToggleCompletion}
        disabled={isPending}
        className={`btn ${isCompleted ? 'btn-outline' : 'btn-success'} ${isPending ? 'loading' : ''}`}
      >
        {isPending ? (
          <span className="loading loading-spinner"></span>
        ) : isCompleted ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Als unerledigt markieren
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Als erledigt markieren
          </>
        )}
      </button>
    </div>
  );
}
