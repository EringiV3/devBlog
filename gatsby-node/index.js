const path = require("path")
const axios = require("axios")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogResult = await graphql(`
    query GatsbyNode {
      allMicrocmsBlog(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            id
            slug
          }
          next {
            title
            slug
          }
          previous {
            title
            slug
          }
        }
        group(field: category___categorySlug) {
          fieldValue
          totalCount
        }
      }
      allMicrocmsCategory {
        nodes {
          category
          categorySlug
          categoryId
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild(`Grapgqlのクエリでエラーが発生しました`)
    return
  }

  blogResult.data.allMicrocmsBlog.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `/blog/post/${node.slug}`,
      component: path.resolve(`./src/templates/blogPostTemplate.tsx`),
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })

  const blogPostsPerPage = 6
  const blogPosts = blogResult.data.allMicrocmsBlog.edges.length
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage)

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blogTemplate.tsx"),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === blogPages,
      },
    })
  })

  blogResult.data.allMicrocmsBlog.group.forEach(node => {
    const categoryPostsPerPage = 6
    const categoryPosts = node.totalCount
    const categoryPages = Math.ceil(categoryPosts / categoryPostsPerPage)

    Array.from({ length: categoryPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/category/${node.fieldValue}/`
            : `/category/${node.fieldValue}/${i + 1}/`,
        component: path.resolve(`./src/templates/categoryTemplate.tsx`),
        context: {
          categoryId: blogResult.data.allMicrocmsCategory.nodes.find(
            n => n.categorySlug === node.fieldValue
          ).categoryId,
          categoryName: blogResult.data.allMicrocmsCategory.nodes.find(
            n => n.categorySlug === node.fieldValue
          ).category,
          categorySlug: node.fieldValue,
          skip: categoryPostsPerPage * i,
          limit: categoryPostsPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === categoryPages,
        },
      })
    })
  })
}
