import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Title from "../components/Title"
import About from "../components/About"
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
