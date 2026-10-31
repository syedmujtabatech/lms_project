import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/pages/Home'
import Courses from './component/pages/Courses'
import Details from './component/pages/Details'
import Login from './component/pages/Login'
import Register from './component/pages/Register'
import MyCourses from './component/pages/account/MyCourses'
import MyLearning from './component/pages/MyLearning'
import WatchCourses from './component/pages/account/WatchCourses'
import ChangePassword from './component/pages/account/ChangePassword'
import { Toaster } from 'react-hot-toast'
import Dashboard from './component/pages/account/Dashboard'
import RequireAuth from './component/common/RequireAuth'
import CreateCourse from './component/pages/account/Courses/CreateCourse'
import EditCourse from './component/pages/account/Courses/EditCourse'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/detail" element={<Details />} />
          <Route path="/courses/:id" element={<Details />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />

          <Route path='/account/dashboard' element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />

          <Route path='/account/my-courses' element={
            <RequireAuth>
              <MyCourses />
            </RequireAuth>
          } />

          <Route path='/account/my-learning' element={
            <RequireAuth>
              <MyLearning />
            </RequireAuth>
          } />

          <Route path='/account/watch-course' element={
            <RequireAuth>
              <WatchCourses />
            </RequireAuth>
          } />

          <Route path='/account/change-password' element={
            <RequireAuth>
              <ChangePassword />
            </RequireAuth>
          } />

          <Route path='/account/course/create' element={
            <RequireAuth>
              <CreateCourse />
            </RequireAuth>
          } />

          <Route path='/account/course/edit/:id' element={
            <RequireAuth>
              <EditCourse />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App;
