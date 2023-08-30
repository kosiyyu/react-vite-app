import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Articles from './page/Articles'


function App() {
  return (
    <>
    <Navbar />
    <main className="container">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/tags" element={<Articles />}></Route>
      </Routes>
    </main>
    </>
  )
}

export default App
