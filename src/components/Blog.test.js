import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title and author, but not the url or like by default', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'testauthor',
      url: 'link.com',
      likes: '1000',
      user: { username: 'reinout' }
    }

    const { container } = render(<Blog blog={blog} />)

    const element =  container.querySelector('#default')
    expect(element).toBeDefined()

    const div = container.querySelector('.togglableHidden')
    screen.debug(div)
    expect(div).toHaveStyle('display: none')

  })
})