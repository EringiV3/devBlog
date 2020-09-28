import { WindowLocation } from "@reach/router"
import { SitePageContext } from "../types/graphql-types"

export type IPageProps = {
  location: WindowLocation
  pageContext: SitePageContext
}
