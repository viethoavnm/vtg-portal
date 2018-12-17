import { RESOURCES_THUMB_PATH } from 'consts'

export function addJSONLD(post, url) {
  return `{
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url + post.url}"
      },
      "headline": "${post.title}",
      "image": [
        "${url + RESOURCES_THUMB_PATH + post.bannerContentName}"
      ],
      "datePublished": "${post.datePublished}",
      "dateModified": "${post.dateModified}",
      "author": {
        "@type": "Person",
        "name": "${post.author}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "${post.author}",
        "logo": {
          "@type": "ImageObject",
          "url": ""
        }
      },
      "description": "${post.introduction}"
    }`
}
