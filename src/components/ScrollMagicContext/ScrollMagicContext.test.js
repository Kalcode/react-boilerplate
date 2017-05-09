import React from 'react'
import { shallow } from 'enzyme'
import ScrollMagicContext from './ScrollMagicContext'

describe('<ScrollMagicContext />', () => {
  it('does something', () => {
    const wrapper = shallow(<ScrollMagicContext><div /></ScrollMagicContext>)
    expect(wrapper.length).toBe(1)
  })
})
