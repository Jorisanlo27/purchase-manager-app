import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    const data = {
      name,
      price,
      quantity,
    };
    setLoading(true);
    axios.post('http://localhost:2727/products/', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Created Successfully!', { variant: 'success' })
        navigate('/')
      }).catch((error) => {
        setLoading(false);
        enqueueSnackbar('ERROR: Please Check Console', { variant: 'error' })
        console.log(error);
      })
  };


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Product</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Price</label>
          <input
            type='text'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
            placeholder='0.00'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Quantity</label>
          <input
            type='number'
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full'
            placeholder='0'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateProduct