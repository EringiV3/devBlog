import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"

export default ({ location }) => {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" pagepath={location.pathname} />
      <Title title="お探しのページが見つかりませんでした" />
    </Layout>
  )
}
