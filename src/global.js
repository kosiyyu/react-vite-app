/**
 * @DEFAULT_THEME - The default theme
 * must be 'dark' or 'light'
 */
export const DEFAULT_THEME = 'dark'
export const JOURNAL_BUNDLE_POST_URL = 'http://localhost:8081/api/v1/journal/bundle/upload/'
export const JOURNAL_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/journal/download/${id}`
export const JOURNALS_DOWNLOAD_URL = 'http://localhost:8081/api/v1/journals/download'
export const TAGS_DOWNLOAD_URL = 'http://localhost:8081/api/v1/tags/download'