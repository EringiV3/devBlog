import React, { useState, useEffect } from "react"
import { getSearchParams } from "gatsby-query-params"
import PostHeader from "../components/post-header"
import PostBody from "../components/post-body"
import Layout from "../components/layout"

export default () => {
  const { contentId, draftKey } = getSearchParams()
  const [postData, setPostData] = useState(null)

  useEffect(() => {
    if (!contentId || !draftKey) return
    fetch(
      `https://${process.env.GATSBY_MICRO_CMS_SERVICE_ID}.microcms.io/api/v1/blog/${contentId}?draftKey=${draftKey}`,
      {
        headers: {
          "X-API-KEY": process.env.MICRO_CMS_API_KEY,
        },
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(json => {
        if (json) {
          setPostData(json)
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
