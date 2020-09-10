import { useStaticQuery, graphql } from "gatsby"

/**
 * 引数で受け取った画像URLと一致する画像のfluidプロパティを返します
 * @param {string} assetUrl 画像URL
 */
export default assetUrl => {
  const { allContentfulAsset } = useStaticQuery(graphql`
    query {
      allContentfulAsset {
        nodes {
          file {
            url
          }
          fluid(maxWidth: 785) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  `)

  return allContentfulAsset.nodes.find(node => node.file.url === assetUrl).fluid
}
