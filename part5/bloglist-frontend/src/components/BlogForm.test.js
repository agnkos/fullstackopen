import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {

  const addBlog = jest.fn()
  const user = userEvent.setup()

  const container = render(<BlogForm addBlog={addBlog} />).container

  const titleInput = container.querySelector('.title-input')
  const authorInput = container.querySelector('.author-input')
  const urlInput = container.querySelector('.url-input')
  const button = container.querySelector('.add-btn')

  const blog = {
    author: 'Aga',
    title: 'frontend blog',
    url: 'www.frontend.com',
  }

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(button)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('frontend blog')
  expect(addBlog.mock.calls[0][0].author).toBe('Aga')
  expect(addBlog.mock.calls[0][0].url).toBe('www.frontend.com')

})