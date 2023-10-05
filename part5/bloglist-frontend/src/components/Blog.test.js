import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('component renders only the title and author by default', () => {

  const blog = {
    author: 'Aga',
    title: 'frontend blog',
    url: 'www.frontend.com',
    likes: 42
  }
  const { container } = render(<Blog blog={blog} />)

  const blogElement = container.querySelector('.blog-element')
  const blogDetail = container.querySelector('.blog-detail')

  expect(blogElement).toBeDefined()
  expect(blogDetail).toHaveStyle('display: none')
})