const path = require("path")
import { Actions, Reporter } from "gatsby"
import {
  MicrocmsBlogConnection,
  MicrocmsCategoryConnection,
} from "../types/graphql-types"
import { BLOG_POST_PER_PAGE, CATEGORY_POST_PER_PAGE } from "../src/constants"

type CreatePageArgs = {
  graphql: Function
  actions: Actions
  reporter: Reporter
}
exports.createPages = async ({
  graphql,
  actions,
  reporter,
}: CreatePageArgs) => {
  const { createPage } = actions

  type ResultType = {
    data: {
      allMicrocmsBlog: MicrocmsBlogConnection
      allMicrocmsCategory: MicrocmsCategoryConnection
    }
    errors: any
  }
  const blogResult: ResultType = await graphql(`
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
      component: path.resolve(`../src/templates/blogPostTemplate.tsx`),
      context: {
        id: node.id,
        next,
        previous,
      },
    })
  })

  const blogPosts = blogResult.data.allMicrocmsBlog.edges.length
  const blogPages = Math.ceil(blogPosts / BLOG_POST_PER_PAGE)

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}`,
      component: path.resolve("../src/templates/blogTemplate.tsx"),
      context: {
        skip: BLOG_POST_PER_PAGE * i,
        limit: BLOG_POST_PER_PAGE,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === blogPages,
      },
    })
  })

  blogResult.data.allMicrocmsBlog.group.forEach(node => {
    const categoryPosts = node.totalCount
    const categoryPages = Math.ceil(categoryPosts / CATEGORY_POST_PER_PAGE)

    Array.from({ length: categoryPages }).forEach((_, i) => {
      const category = blogResult.data.allMicrocmsCategory.nodes.find(
        n => n.categorySlug === node.fieldValue
      )
      if (!category) return
      createPage({
        path:
          i === 0
            ? `/category/${node.fieldValue}/`
            : `/category/${node.fieldValue}/${i + 1}/`,
        component: path.resolve(`../src/templates/categoryTemplate.tsx`),
        context: {
          categoryId: category.categoryId,
          categoryName: category.category,
          categorySlug: node.fieldValue,
          skip: CATEGORY_POST_PER_PAGE * i,
          limit: CATEGORY_POST_PER_PAGE,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === categoryPages,
        },
      })
    })
  })
}
