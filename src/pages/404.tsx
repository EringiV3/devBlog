import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import { IPageProps } from "../../types/page-props"

const NotFoundPage: React.FC<IPageProps> = ({ location }) => {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" pagepath={location.pathname} />
      <Title title="お探しのページが見つかりませんでした" />
    </Layout>
  )
}

export default NotFoundPage
