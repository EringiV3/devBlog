/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `ESSENTIALS`,
    description: `おいしい食材と食事を探求するサイト`,
    lang: `ja`,
    siteUrl: `https://my-first-gatsby-basesite.netlify.app`,
    locale: `js_JP`,
    fbappid: `xxxxxxxxxx`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ESSENTIALS エッセンシャルズ`,
        short_name: `ESSENTIALS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        createLinkInHead: true,
        exclude: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.nodes.map(node => {
            return {
              url: `${site.siteMetadata.siteUrl}${node.path}`,
              changefreq: `weekly`,
              priority: 0.5,
            }
          })
        },
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: process.env.microCMS_API_KEY,
        serviceId: "eringiv3devblog",
        apis: [
          {
            endpoint: "blog",
            query: {
              limit: 100,
            },
          },
          {
            endpoint: "category",
            query: {
              limit: 100,
            },
          },
        ],
      },
    },
  ],
}
