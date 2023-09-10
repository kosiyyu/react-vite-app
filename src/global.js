/**
 * @DEFAULT_THEME - The default theme
 * must be 'dark' or 'light'
 */
export const DEFAULT_THEME = 'dark'
export const ARTICLE_BUNDLE_POST_URL = 'http://localhost:8081/api/v1/article/bundle/upload/'
export const ARTICLE_DOWNLOAD_URL = (id) => `http://localhost:8081/api/v1/article/download/${id}`
export const ARTICLES_DOWNLOAD_URL = 'http://localhost:8081/api/v1/articles/download'
export const TAGS_DOWNLOAD_URL = 'http://localhost:8081/api/v1/tags/download'