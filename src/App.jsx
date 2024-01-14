import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

// setting the state with input of the login form:
const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const user = await loginService.login(
      {
        username, password,
      },
      setErrorMessage
    );

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    );

    blogService.setToken(user.token);
    setUser(user);
    setUsername('');
    setPassword('');
    setSuccessMessage('Login successful');
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  } catch (error) {
    console.error("Login error:", error);
    setErrorMessage('Error. Wrong credentials. Please try again.');
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }
};

  // getting blogs based on if the user state changes.
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  // using an effect hook to get the local stored credentials on the first render.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  // creating logout handler. 
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // loginform handler
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

// handle new blog function
const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      setSuccessMessage(`${newBlog.title} by ${newBlog.author} was added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs([...blogs, newBlog]);
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Wrong input. Please try again. Error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
// Blog form
const newBlogForm = () => (
  <form onSubmit={handleNewBlog}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>      
  )


  if (user === null) {
    return (
      <div>
      <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <Notification message={successMessage} />
      <h2>blogs</h2>
      <p>{user.username} logged in </p> 
      <button onClick={() => handleLogout()}>logout</button>
      <h3>Create new Blog</h3>
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App