import React from 'react'
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import PrivateRoute from './components/helpers/PrivateRoute'
import Navbar from './components/helpers/Navbar'
import Home from './components/home/Home'
import Login from './components/home/Login'
import Signup from './components/home/Signup'
import AdminPage from './components/admin/AdminPage'
import UserPage from './components/user/UserPage';
import MovieDetails from "./components/user/MovieDetails/MovieDetails";
import UserSettings from "./components/helpers/UserSettings";
import {Provider} from "react-redux"
import {store} from "./store/ReduceStore";

function App() {
  return (
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/adminpage" element={<PrivateRoute><AdminPage /></PrivateRoute>}/>
              <Route path="/userpage" element={<PrivateRoute><UserPage /></PrivateRoute>}/>
              <Route path="/movie/:id" element={<PrivateRoute><MovieDetails/></PrivateRoute>}/>
              <Route path="/settings" element={<PrivateRoute><UserSettings/></PrivateRoute>}/>
              <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
          </Router>
        </AuthProvider>
      </Provider>
  )
}

export default App;
