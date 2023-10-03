import { useState } from "react"
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {

    const [newBlog, setNewBlog] = useState({ 'title': '', 'author': '', 'url': '' })

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
            <h3>Add new blog</h3>
            <form onSubmit={addNewBlog} className="form">
                <div className="form-element">
                    title:
                    <input
                        type="text"
                        value={newBlog.title}
                        name="title"
                        onChange={handleBlogChange}
                    />
                </div>
                <div className="form-element">
                    author:
                    <input
                        type="text"
                        value={newBlog.author}
                        name="author"
                        onChange={handleBlogChange}
                    />
                </div>
                <div className="form-element">
                    url:
                    <input
                        type="text"
                        value={newBlog.url}
                        name="url"
                        onChange={handleBlogChange}
                    />
                </div>
                <button type="submit" className="add-btn">add</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired
}

export default BlogForm