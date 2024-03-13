import React from 'react';
import ProductSingleCard from './ProductSingleCard';

const ProductsCard = ({ products }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {products.map((product) => (
        <ProductSingleCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductsCard