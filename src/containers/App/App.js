import React from 'react'
import PropTypes from 'prop-types'
import { BaseHelmet } from 'components/Helmet'
import ContentProvider from 'components/ContentProvider'
import ScrollMagicContext from 'components/ScrollMagicContext'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

export default function App(props) {
  return (
    <ScrollMagicContext {...props}>
      <ContentProvider>
        <BaseHelmet />
        <Nav />
        {props.children}
        <Footer />
      </ContentProvider>
    </ScrollMagicContext>
  )
}

App.propTypes = {
  children: PropTypes.node,
}
