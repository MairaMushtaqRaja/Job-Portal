import Header from '@/components/Header';
import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
    <div className="grid-background"></div>
    <main className="container mx-auto px-10 min-h-screen">
    <Header/>
    <Outlet></Outlet> 
    </main>
    <div  className="p-10 text-center bg-gray-800 mt-10">
    Made with 💗 by RoadsideCoder
    </div>
    </div>
    
  )
}

export default AppLayout