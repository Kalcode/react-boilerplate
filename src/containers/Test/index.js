import React from 'react'
import Helmet from 'components/Helmet'

export default function Home({ content }) {
  const { test } = content
  return (
    <main>
      <Helmet
        title={test.meta_title}
        description={test.meta_description}
      />
      <h1>This is a test page</h1>
      <p>Array List:</p>
      <ul style={{ listStyle: 'disc' }}>
        {test.list.map(item => <li key={item}>item</li>)}
      </ul>
    </main>
  )
}
