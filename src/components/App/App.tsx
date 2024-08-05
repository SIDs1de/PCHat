import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/sign-in' element={<MainPage modal={{ opened: true, type: 'sign-in' }} />} />
        <Route path='/sign-up' element={<MainPage modal={{ opened: true, type: 'sign-up' }} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
