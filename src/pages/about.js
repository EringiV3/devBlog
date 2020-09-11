import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

// TODO microCMSにaboutのAPIを用意する
export default ({ data, location }) => {
  return (
    <Layout>
      <SEO
        pagetitle="このブログについて"
        pagedesc="アウトプットの場として使います"
        pagepath={location.pathname}
      />
      <div>
        <article className="content">
          <div className="container">
            <h1 className="bar">About</h1>
            <div className="postbody">
              Hi! Remus Lupin - also known as Moony - is currently teaching
              "Defense against the Dark Arts" at Hogwarts. He was afflicted with
              lycanthropy during his childhood, as a result of Fenrir Greyback's
              revenge against Lyall. He attended Hogwarts School of Witchcraft
              and Wizardry from 1971-1978 and was Sorted into Gryffindor House.
              During his school years he was one of the Marauders, best friends
              with Sirius Black, James Potter, and Peter Pettigrew. Together
              they created the Marauder's Map. He fought against Death Eaters
              once more in the Second Wizarding War, during which he lost his
              friend Sirius. In 1997, Remus married fellow Order member
              Nymphadora Tonks and had a son, Edward Remus Lupin, of whom he
              named Harry the godfather. Remus fought at the Battle of Hogwarts
              on 2 May, 1998, during which his wife was murdered by Bellatrix
              Lestrange. Remus was also murdered by Death Eater, Antonin
              Dolohov, during the first half of the same battle. His death was
              avenged by Filius Flitwick.
            </div>
          </div>
        </article>
        <style jsx>{`
          .postbody {
            color: blue;
          }
        `}</style>
      </div>
    </Layout>
  )
}
