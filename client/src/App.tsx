import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MainLayout } from './layouts/Main';
import { Home } from './pages/Home';
import { Teams } from './pages/Teams';
import { Account } from './pages/Profile/Account';
import { Settings } from './pages/Profile/Settings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='teams' element={<Teams />} />
            <Route path='settings' element={<Settings />}>
              <Route index element={<Account />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
