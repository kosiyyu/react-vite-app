/**
 * @DEFAULT_THEME - The default theme
 * must be 'dark' or 'light'
 */
export const DEFAULT_THEME = "dark"

// JOURNAL
export const JOURNAL_BUNDLE_POST_URL = "http://localhost:8081/api/v1/journal/bundle/upload/"
export const JOURNAL_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/journal/download/${id}`
export const JOURNALS_TOKENIZED_DOWNLOAD_URL = "http://localhost:8081/api/v1/journals/tokenized/download"

// TAG
export const TAGS_DOWNLOAD_URL = "http://localhost:8081/api/v1/tags/download"
export const TAG_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/tag/download/${id}`

// CSV
export const CSV_UPLOAD_URL = "http://localhost:8081/api/v1/csv/upload"
