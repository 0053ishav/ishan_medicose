import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const HeaderLogo = () => {
  return (
    <Link href="/">
        <div className='items-center hidden lg:flex'>
            <Image src="/Logo/logo-white.png" height={100} width={200} alt='logo'/>
        </div>
        
    </Link>
  )
}

export default HeaderLogo