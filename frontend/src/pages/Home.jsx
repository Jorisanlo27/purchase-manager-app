import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:2727/products')
      .then((res) => {
        setProducts(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])


  return (
    <div className='p-4'>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Products List</h1>
        <Link to={'/products/create'}>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-full border-separate border-spacing-1'>
          <thead>
            <tr>
              {['#', 'Name', 'Price', 'Quantity', 'Actions'].map((th, i) => (
                <th key={i} className='border border-slate-600 rounded-md'>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {i + 1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {product.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {product.price}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {product.quantity}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/products/details/${product._id}`}>
                      <BsInfoCircle className='text-2xl text-green-800' />
                    </Link>
                    <Link to={`/products/edit/${product._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-800' />
                    </Link>
                    <Link to={`/products/delete/${product._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-800' />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th class="border bg-slate-800 text-white font-bold rounded-md text-center"></th>
              <th class="border bg-slate-800 text-white font-bold rounded-md text-center">Total</th>
              <td class="border bg-slate-800 text-white font-bold rounded-md text-center">?</td>
              <td class="border bg-slate-800 text-white font-bold rounded-md text-center">?.??</td>
              <th class="border bg-slate-800 text-white font-bold rounded-md text-center"></th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  )
}

export default Home