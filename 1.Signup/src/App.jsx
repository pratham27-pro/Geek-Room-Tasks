import { useState } from 'react'
import './index.css'
import { Routes, Route, Link, createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from './components/Auth.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth/>
    },
  ]);

  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
