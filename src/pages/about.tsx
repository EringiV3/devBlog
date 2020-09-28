import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import About from "../components/about"
import { IPageProps } from "../../types/page-props"

const AboutPage: React.FC<IPageProps> = ({ location }) => {
  return (
    <Layout>
      <SEO
        pagetitle="このブログについて"
        pagedesc="アウトプットの場として使います"
        pagepath={location.pathname}
      />
      <Title title="About" />
      <About />
    </Layout>
  )
}
export default AboutPage
