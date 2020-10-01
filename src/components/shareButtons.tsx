import React from "react"
import {
  HatenaIcon,
  HatenaShareButton,
  TwitterShareButton,
  TwitterIcon,
} from "react-share"
import { TWITTER_ACCOUNT } from "../constants"

type Props = { title: string; url: string }
const shareButtons: React.FC<Props> = ({ title, url }) => {
  return (
    <>
      <div className="share-buttons">
        <TwitterShareButton
          title={title}
          via={TWITTER_ACCOUNT}
          url={url}
          style={{ paddingRight: "10px" }}
        >
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <HatenaShareButton url={url}>
          <HatenaIcon size={50} round />
        </HatenaShareButton>
      </div>
      <style jsx>{`
        .share-buttons {
          display: flex;
          margin: 80px 0 0 0;
        }
      `}</style>
    </>
  )
}

export default shareButtons
