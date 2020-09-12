import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import AboutArticle from "../components/about-article"

export default ({ data, location }) => {
  return (
    <Layout>
      <SEO
        pagetitle="このブログについて"
        pagedesc="アウトプットの場として使います"
        pagepath={location.pathname}
      />
      <Title title="About" />
      <AboutArticle />
    </Layout>
  )
}
