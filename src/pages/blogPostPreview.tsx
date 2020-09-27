import React, { useState, useEffect } from "react"
import { getSearchParams } from "gatsby-query-params"
import PostHeader from "../components/PostHeader"
import PostBody from "../components/PostBody"
import Layout from "../components/Layout"

const BlogPostPreviewPage: React.FC = () => {
  const {
    contentId,
    draftKey,
  }: { contentId: string; draftKey: string } = getSearchParams()
  const [postData, setPostData] = useState<null>(null)

  useEffect(() => {
    if (!contentId || !draftKey) return
    fetch(
      `https://eringiv3devblog.microcms.io/api/v1/blog/${contentId}?draftKey=${draftKey}`,
      {
        headers: {
          "X-API-KEY": "88579ee3-f970-40ba-8203-74408d675279",
        },
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return null
      })
      .then((data: any) => {
        if (data !== null) {
          setPostData(data)
        }
      })
  }, [contentId, draftKey])

  return postData ? (
    <Layout>
      <PostHeader
        title={postData.title}
        publishDate={postData.publishDate}
        publishDateJP={postData.publishDate} // プレビューモードではgraphqlで取得していないので日時のフォーマットは行わずにISO8601形式でそのまま表示する
        category={postData.category}
      />
      <PostBody loopContents={postData.content} />
    </Layout>
  ) : (
    <div>loading...</div>
  )
}
export default BlogPostPreviewPage
