import { useState } from "react"

const BlogForm = ({ addBlog }) => {

    const [newBlog, setNewBlog] = useState({ 'title': '', 'author': '', 'url': '' })

    const handleBlogChange = ({ target }) => {
        setNewBlog({ ...newBlog, [target.name]: target.value })
      }

    return (
        <div>
            <h3>Add new blog</h3>
            <form onSubmit={addBlog} className="form">
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
export default BlogForm