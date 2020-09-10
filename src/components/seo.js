import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export default ({
  pagetitle,
  pagedesc,
  pagepath,
  pageimg,
  pageimgw,
  pageimgh,
  blogimg,
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          lang
          siteUrl
          locale
          fbappid
        }
      }
    }
  `)

  const title = pagetitle
    ? `${pagetitle} | ${siteMetadata.title}`
    : siteMetadata.title

  const description = pagedesc || siteMetadata.description

  const url = pagepath
    ? `${siteMetadata.siteUrl}${pagepath}`
    : siteMetadata.siteUrl

  const imgurl = pageimg
    ? `${siteMetadata.siteUrl}${pageimg}`
    : blogimg || `${siteMetadata.siteUrl}/thumb.jpg`

  const imgw = pageimgw || 1280
  const imgh = pageimgh || 640

  return (
    <Helmet>
      <html lang={siteMetadata.lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={siteMetadata.locale} />
      <meta property="og:url" content={siteMetadata.fbappid} />
      <meta property="og:image" content={imgurl} />
      <meta property="og:image:width" content={imgw} />
      <meta property="og:image:height" content={imgh} />
      <meta property="twitter:card" content="summary_large_image" />
    </Helmet>
  )
}
