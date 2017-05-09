import React from 'react'
import Helmet from 'components/Helmet'
import Form, { Input, TextArea, Select } from 'components/Form'
import config from 'config'

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
      <h4>Submit some info!</h4>
      <div style={{ maxWidth: 500, marginBottom: 50 }}>
        <Form form={config.wufoo} honeypot={config.wufoo.honeypot}>
          <Input
            label='Full Name'
            id={config.wufoo.name}
            autoCorrect='off'
            autoComplete='name'
            required
            />
          <Input
            label='Email'
            id={config.wufoo.email}
            autoCorrect='off'
            autoComplete='email'
            required
            />
          <Input
            label='Phone'
            id={config.wufoo.phone}
            autoCorrect='off'
            autoComplete='tel'
            />
          <TextArea
            label='Message'
            id={config.wufoo.message}
            autoCorrect='off'
            autoComplete='off'
            />
          <Select
            label='Size of Mug'
            id={config.wufoo.group}
            autoCorrect='off'
            required
            >
            <option>16 oz</option>
            <option>22 oz</option>
            <option>44 oz</option>
          </Select>
        </Form>
      </div>
    </main>
  )
}
