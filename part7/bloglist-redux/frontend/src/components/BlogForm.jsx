import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog('')
  }

  return (
    <div>
      <Form onSubmit={addNewBlog}>
        <Form.Group>
          <Form.Label className='mb-0'>title</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.title || ''}
            name="title"
            onChange={handleBlogChange}
            className="mb-1"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className='mb-0'>author</Form.Label>
          <Form.Control
            type="text"
            value={newBlog.author || ''}
            name="author"
            onChange={handleBlogChange}
            className="mb-1"
          />
        </Form.Group>
        <Form.Group className="form-element">
          <Form.Label className='mb-0'>url</Form.Label>
          <Form.Control type="text" value={newBlog.url || ''} name="url" onChange={handleBlogChange} className="" />
        </Form.Group>
        <Button type="submit" variant='success' className='mt-3 mb-2'>
          add
        </Button>
      </Form>
    </div >
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
