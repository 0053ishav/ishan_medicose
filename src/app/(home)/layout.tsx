import Header from '@/components/Header'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
import BottomNavigation from '@/components/BottomNavigation'
type Props = {
    children: React.ReactNode
}
const DashboardLayout = ({ children }: Props) => {
  return (
    <>
    <Header />
    <main className='px-3 lg:px-14 bg-gray-50'> 
    <Toaster/>
        {children}
    </main>
    <BottomNavigation/>
    </>
  )
}

export default DashboardLayout