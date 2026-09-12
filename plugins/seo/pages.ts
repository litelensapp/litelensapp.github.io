export interface PageMeta {
  /** URL path, e.g. "/" or "/features/core". */
  path: string
  title: string
  description: string
  /** Breadcrumb label for this page's JSON-LD. Omit for the homepage. */
  breadcrumbLabel?: string
}
