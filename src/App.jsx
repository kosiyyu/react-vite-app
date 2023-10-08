import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Journals from './page/journal/Journals'

function App() {
  return (
    <>
    <Navbar />
    <main className="container-fluid">
      <Routes>
        {/* {main routes} */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/articles" element={<Journals />}></Route>
        <Route path="/tags" element={<Journals />}></Route>

        {/* {sub routes} */}
        {/* <Route path="/article/:id" element={<ValidateJournal />}></Route>
        <Route path="/article/add" element={<AddJournal />}></Route> */}

      </Routes>
    </main>
    </>
  )
}

export default App
