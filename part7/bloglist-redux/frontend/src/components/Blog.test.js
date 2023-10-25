import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const addLike = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'Aga',
      title: 'frontend blog',
      url: 'www.frontend.com',
      likes: 42,
    }
    container = render(<Blog blog={blog} addLike={addLike} />).container
  })

  test('component renders only the title and the author by default', () => {
    const blogElement = container.querySelector('.blog-element')
    const blogDetail = container.querySelector('.blog-detail')

    expect(blogElement).toBeDefined()
    expect(blogDetail).toHaveStyle('display: none')
  })

  test('url and likes are displayed when the show button is clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.show-btn')

    await user.click(button)

    const blogElement = container.querySelector('.blog-element')
    const blogDetail = container.querySelector('.blog-detail')

    expect(blogElement).toHaveStyle('display:none')
    expect(blogDetail).toBeDefined()
  })

  test('when like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.like-btn')

    await user.dblClick(button)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
