import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column'
  }

  const [viewBlog, setViewBlog] = useState(false)

  const hideWhenVisible = { display: viewBlog ? 'none' : '' }
  const showWhenVisible = { display: viewBlog ? '' : 'none' }

  const toggleVisibility = () => {
    setViewBlog(!viewBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>Hide</button>
        <div>
          {blog.url} <br/>
          <div>
            likes {blog.likes} <button>Like</button>
        </div>
          {blog.user.username}
        
        </div>
      </div>
    </div>
  )
}
export default Blog