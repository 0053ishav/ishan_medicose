import Products from '@/components/Products'
import React from 'react'

const ProductPage = () => {
  return (
    <div className='p-8'>
        <h1 className="text-2xl font-bold mb-6 text-slate-700">
          All Products
        </h1>
        <Products />
    </div>
  )
}

export default ProductPage