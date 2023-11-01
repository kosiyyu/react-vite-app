import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/Home'
import Journals from './page/journal/Journals'
import ValidateJournal from './page/journal/ValidateJournal'
import SearchTokenProvider from './context/SearchTokenProvider'

function App() {
  return (
    <>
    <Navbar />
    <main className="container-fluid">
      <Routes>
        {/* {main routes} */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route 
          path="/journals" 
          element={
            <SearchTokenProvider>
              <Journals />
            </SearchTokenProvider>
        }
          >
        </Route>
        <Route path="/tags" element={<></>}></Route>

        {/* {sub routes} */}
        <Route path="/journal/:id" element={<ValidateJournal />}></Route>

      </Routes>
    </main>
    </>
  )
}

export default App
