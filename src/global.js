export const DEFAULT_THEME = "dark"

// JOURNAL
export const JOURNALS_TOKENIZED_DOWNLOAD_URL = "http://localhost:8081/api/v1/journals/tokenized/download"
export const JOURNAL_BUNDLE_UPLOAD_URL = "http://localhost:8081/api/v1/journal/bundle/upload/"
export const JOURNAL_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/journal/download/${id}`
export const JOURNAL_EDIT_URL = "http://localhost:8081/api/v1/journal/edit"
export const JOURNAL_DELETE_URL = (id) => `http://localhost:8081/api/v1/journal/delete/${id}`

// TAG
export const TAGS_DOWNLOAD_URL = "http://localhost:8081/api/v1/tags/download"
export const TAG_UPLOAD_URL = "http://localhost:8081/api/v1/tag/upload"
export const TAG_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/tag/download/${id}`
export const TAG_EDIT_URL = "http://localhost:8081/api/v1/tag/edit"
export const TAG_DELETE_URL = (id) => `http://localhost:8081/api/v1/tag/delete/${id}`

// CSV
export const CSV_UPLOAD_URL = "http://localhost:8081/api/v1/csv/upload"

// FILEMETADATA
export const FILEMETADATA_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/filemetadata/download/${id}`

// WEB SCRAPER
export const WEB_SCRAPER_URL = (value) => `http://localhost:3000/${value}`