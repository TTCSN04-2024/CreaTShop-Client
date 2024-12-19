import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(4);

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
            setProducts(res.data.data);
        } catch (err) {
            const { status, message } = err.response?.data.meta || { status: 'Error', message: 'Unable to fetch products' };
            toast.error(`${status} - ${message}`);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

	// Pagination calculations
	const totalPages = Math.ceil(products.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handlePageClick = (pageNum) => {
		setCurrentPage(pageNum);
	};

	return (
        <div className='container mx-auto p-6'>
            <h1 className='font-bold text-3xl'>Admin Product</h1>
            <button className='bg-red-700 text-white p-2 rounded-lg'>Add Product</button>
            <div className='p-4'></div>

            {products.length > 0 ? (
                <div className='overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>#</th>
                                <th scope='col' className='px-6 py-3'>Tên Sản Phẩm</th>
                                <th scope='col' className='px-6 py-3'>Ảnh</th>
                                <th scope='col' className='px-6 py-3'>Đơn giá</th>
                                <th scope='col' className='px-6 py-3'>Màu sắc</th>
                                <th scope='col' className='px-6 py-3'>Kích cỡ</th>
                                <th scope='col' className='px-6 py-3'>Số lượng hàng tồn kho</th>
                                <th scope='col' className='px-6 py-3'>Chức năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((prd, index) => (
                                prd.variants.map((variant) => (
                                    <tr key={variant.id}>
                                        <td className='px-4 py-2'>{index + 1}</td>
                                        <td className='px-4 py-2'>{prd.name}</td>
                                        <td>
                                            <img src={prd.imageStaticUrl} alt={prd.name} className='w-20 h-20' />
                                        </td>
                                        <td className='px-4 py-2'>{prd.price} VND</td>
                                        <td className='px-4 py-2'>{variant.color}</td>
                                        <td className='px-4 py-2'>{variant.size}</td>
                                        <td className='px-4 py-2'>{variant.quantity}</td>
                                        <td>
                                            <button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='text-center py-4'>No products available</div>
            )}

            {products.length > 0 && (
                <div className='flex justify-between items-center mt-6'>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50'
                    >
                        Previous
                    </button>
                    <div className='flex space-x-2'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            index === 0 || index === totalPages - 1 || (index >= currentPage - 1 && index <= currentPage + 1) ? (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageClick(index + 1)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`}
                                >
                                    {index + 1}
                                </button>
                            ) : (
                                index === currentPage - 2 || index === currentPage + 2 ? (
                                    <span key={index + 1} className='px-4 py-2 text-gray-300'>...</span>
                                ) : null
                            )
                        ))}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50'
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default AdminProduct;
