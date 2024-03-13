import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:2727/products/' + id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Product</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 underline'>Id:</span>
            <span>{product._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 underline'>Name:</span>
            <span>{product.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 underline'>Price:</span>
            <span>{product.price}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 underline'>Quantity:</span>
            <span>{product.quantity}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 underline'>Created Time:</span>
            <span>{new Date(product.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500 underline'>Last Updated Time:</span>
            <span>{new Date(product.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowProduct