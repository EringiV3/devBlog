import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { AllImageSharpQuery, ImageSharpFluid } from "../../types/graphql-types"

type Props = {
  filename: string
  alt: string
  style: object
}
const Image: React.FC<Props> = props => {
  const { allImageSharp }: AllImageSharpQuery = useStaticQuery(graphql`
    query AllImageSharp {
      allImageSharp {
        nodes {
          fluid(maxWidth: 1600) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  type FluidImage = {
    fluid?:
      | (Pick<ImageSharpFluid, "originalName"> &
          Pick<
            ImageSharpFluid,
            | "base64"
            | "aspectRatio"
            | "src"
            | "srcSet"
            | "srcWebp"
            | "srcSetWebp"
            | "sizes"
          >)
      | null
      | undefined
  }
  type FluidImageList = FluidImage[]

  const getFluid = (allImageSharpNodes: FluidImageList, filename: string) => {
    if (allImageSharpNodes === null || allImageSharpNodes === undefined) {
      return null
    }
    return allImageSharpNodes.find(
      (node: FluidImage) => node?.fluid?.originalName === filename
    )?.fluid
  }

  const fluidImage = getFluid(allImageSharp.nodes, props.filename)

  return fluidImage ? (
    <figure>
      <Img fluid={fluidImage as any} alt={props.alt} style={props.style} />
    </figure>
  ) : null
}

export default Image
