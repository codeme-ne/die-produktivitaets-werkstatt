import type { MDXComponents } from "mdx/types";
import { components as baseComponents } from "@/components/mdx";

/**
 * Provide custom MDX components (e.g. callouts, checklist) to every MDX file.
 * Next.js automatically picks up this hook when rendering MDX content.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  };
}
