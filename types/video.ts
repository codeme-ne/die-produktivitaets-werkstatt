export type VideoLink = {
  label: string;
  href: string;
};

export type VideoMeta = {
  guid: string;
  description?: string;
  images?: string[];
  alt?: string[];
  links?: VideoLink[];
};
