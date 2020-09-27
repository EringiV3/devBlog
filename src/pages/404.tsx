import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Title from "../components/Title"

type Location = {
  pathname: string
}
type Props = { location: Location }
const NotFoundPage: React.FC<Props> = ({ location }) => {
  return (
    <Layout>
      <SEO pagetitle="ページが見つかりません" pagepath={location.pathname} />
      <Title title="お探しのページが見つかりませんでした" />
    </Layout>
  )
}

export default NotFoundPage
