import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Articles from './page/article/Articles'
// import NotFound from './page/error/NotFound'
import ValidateArticle from './page/article/ValidateArticle'
//import Article from './page/article/Article'

function App() {
  return (
    <>
    <Navbar />
    <main className="container">
      <Routes>
        {/* {main routes} */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/tags" element={<Articles />}></Route>

        {/* {sub routes} */}
        <Route path="/article/:id" element={<ValidateArticle />}></Route>

      </Routes>
    </main>
    </>
  )
}

export default App
