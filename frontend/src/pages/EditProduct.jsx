import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:2727/products/${id}`)
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price)
        setQuantity(res.data.quantity)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('ERROR: Please Check Console');
        console.log(error);
      });
  }, [])


  const handleEdit = () => {
    const data = {
      name,
      price,
      quantity,
    };
    setLoading(true);
    axios
      .put(`http://localhost:2727/products/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Product Edited Successfully!', { variant: 'success' })
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('ERROR: Please Check Console', { variant: 'error' })
        console.log(error);
      });
  };


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Product</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleEdit}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProduct