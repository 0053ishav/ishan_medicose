import Header from '@/components/Header'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
type Props = {
    children: React.ReactNode
}
const DashboardLayout = ({ children }: Props) => {
  return (
    <>
    <Header />
    <main className='px-3 lg:px-14'> 
    <Toaster/>
        {children}
    </main>
    </>
  )
}

export default DashboardLayout