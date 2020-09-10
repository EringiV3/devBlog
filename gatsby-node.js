const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogResult = await graphql(`
    query {
      allContentfulBlogPost(sort: { order: DESC, fields: publishDate }) {
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
      }
      allContentfulCategory {
        edges {
          node {
            categorySlug
            id
            category
            blogpost {
              title
            }
          }
        }
      }
    }
  `)

  if (blogResult.errors) {
    reporter.panicOnBuild(`Grapgqlのクエリでエラーが発生しました`)
    return
  }

  blogResult.data.allContentfulBlogPost.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: `/blog/post/${node.slug}`,
        component: path.resolve(`./src/templates/blogpost-template.js`),
        context: {
          id: node.id,
          next,
          previous,
        },
      })
    }
  )

  const blogPostsPerPage = 6
  const blogPosts = blogResult.data.allContentfulBlogPost.edges.length
  const blogPages = Math.ceil(blogPosts / blogPostsPerPage)

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        skip: blogPostsPerPage * i,
        limit: blogPostsPerPage,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === blogPages,
      },
    })
  })

  blogResult.data.allContentfulCategory.edges.forEach(({ node }) => {
    const categoryPostsPerPage = 6
    const categoryPosts = node.blogpost.length
    const categoryPages = Math.ceil(categoryPosts / categoryPostsPerPage)

    Array.from({ length: categoryPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/category/${node.categorySlug}/`
            : `/category/${node.categorySlug}/${i + 1}/`,
        component: path.resolve(`./src/templates/category-template.js`),
        context: {
          categoryId: node.id,
          categoryName: node.category,
          categorySlug: node.categorySlug,
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
