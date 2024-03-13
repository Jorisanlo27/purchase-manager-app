import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ProductsTable = ({ products }) => {
    return (
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
                    <th className="border bg-slate-800 text-white font-bold rounded-md text-center"></th>
                    <th className="border bg-slate-800 text-white font-bold rounded-md text-center">Total</th>
                    <td className="border bg-slate-800 text-white font-bold rounded-md text-center">?</td>
                    <td className="border bg-slate-800 text-white font-bold rounded-md text-center">?.??</td>
                    <th className="border bg-slate-800 text-white font-bold rounded-md text-center"></th>
                </tr>
            </tfoot>
        </table>
    )
}

export default ProductsTable