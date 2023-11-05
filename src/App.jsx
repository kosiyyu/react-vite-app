import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './page/home/Home'
import Journals from './page/journal/Journals'
import ValidateJournal from './page/journal/ValidateJournal'
import SearchTokenProvider from './context/SearchTokenProvider'
import Tags from './page/tag/Tags'
import ValidateTag from './page/tag/ValidateTag'
import Csv from './page/csv/Csv'
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        {/* {main routes} */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/journals" element={
            <SearchTokenProvider>
              <Journals />
            </SearchTokenProvider>
          }
        />
        <Route path="/csv" element={<Csv />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        {/* {sub routes} */}
        <Route path="/journal/:id" element={<ValidateJournal />}></Route>
        <Route path="/tag/:id" element={<ValidateTag />}></Route>
        {/* */}
      </Routes>
      <Toaster />
    </>
  )
}

export default App
