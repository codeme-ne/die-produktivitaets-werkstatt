import type { MDXComponents } from 'mdx/types';

/**
 * MDX components for styling lesson content
 */
export const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 mt-8 first:mt-0">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-base-content/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-base-content/90">{children}</li>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-');
    
    if (isBlock) {
      return (
        <code className={`${className} block bg-base-300 p-4 rounded-lg overflow-x-auto mb-4 text-sm`}>
          {children}
        </code>
      );
    }
    
    return (
      <code className="bg-base-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-base-300 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-base-content/80">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-base-300" />,
  strong: ({ children }) => (
    <strong className="font-bold text-base-content">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
};
