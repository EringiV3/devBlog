import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Title from "../components/Title"
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
