// Blog form
const BlogForm = ({
  title,
  author,
  url,
  handleNewBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog} >
        <div>
          title:
          <input
            type='text'
            value={title}
            name='title'
            onChange={handleTitleChange}
            placeholder='input-title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={author}
            name='author'
            onChange={handleAuthorChange}
            placeholder='input-author'
          />
        </div>
        <div>
                        url:
          <input
            type='text'
            value={url}
            name='url'
            onChange={handleUrlChange}
            placeholder='input-url' />
        </div>
        <button type='submit' data-testid='create'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm