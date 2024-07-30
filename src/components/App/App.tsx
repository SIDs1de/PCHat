import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import ProtectedRoute from '../ProtectedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App
