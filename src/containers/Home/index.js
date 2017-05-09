import React from 'react'
import Helmet from 'components/Helmet'

export default function Home({ content }) {
  const { home } = content
  return (
    <main>
      <Helmet
        title={home.meta_title}
        description={home.meta_description}
      />
      <h1>Home Page</h1>
    </main>
  )
}
