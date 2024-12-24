import axios from 'axios';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../hook/useAuth';
import {FileUploader} from 'react-drag-drop-files';

const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];
const AdminProduct = () => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(4);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [editProduct, setEditProduct] = useState(null);
	const [newProduct, setNewProduct] = useState({
		name: '',
		price: '',
		staticImg: null,
		dynamicImg: null,
		categoryId: '',
	});
	const resetForm = () => {
		setNewProduct({
			name: '',
			price: '',
			staticImg: null,
			dynamicImg: null,
			categoryId: '',
		});
		setEditProduct(null);
	};
	const currUser = useAuth();

	const getAllProducts = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
			setProducts(res.data.data);
		} catch (err) {
			const {status, message} = err.response?.data.meta || {status: 'Error', message: 'Unable to fetch products'};
			toast.error(`${status} - ${message}`);
		}
	};
	const getAllCategory = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
			const allCategories = res.data.data.flatMap((item) => item.categories);
			setCategories(allCategories);
			// setCategories(res.data.data)
		} catch (err) {
			console.error(err);
			toast.error('Failed to fetch categories');
		}
	};

	useEffect(() => {
		getAllProducts();
		getAllCategory();
	}, []);

	const handleInputChange = (e) => {
		const {name, value, type} = e.target;
		if (type === 'number') {
			setNewProduct((prev) => ({
				...prev,
				[name]: parseFloat(value),
			}));
		} else {
			setNewProduct((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleStaticFileChange = (file) => {
		setNewProduct((prev) => ({
			...prev,
			staticImg: file,
		}));
	};

	const handleDynamicFileChange = (file) => {
		setNewProduct((prev) => ({
			...prev,
			dynamicImg: file,
		}));
	};
	const staticImgUrl = newProduct.staticImg ? URL.createObjectURL(newProduct.staticImg) : null;
	const dynamicImgUrl = newProduct.dynamicImg ? URL.createObjectURL(newProduct.dynamicImg) : null;

	console.log('allcategory', categories);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append('name', newProduct.name);
			formData.append('price', newProduct.price);
			formData.append('categoryId', newProduct.categoryId);

			if (newProduct.staticImg) {
				formData.append('staticImg', newProduct.staticImg);
			}
			if (newProduct.dynamicImg) {
				formData.append('dynamicImg', newProduct.dynamicImg);
			}

			let response;
			if (editProduct) {
				response = await axios.put(`${import.meta.env.VITE_API_URL}/products/${editProduct.id}`, formData, {
					headers: {
						Authorization: `Bearer ${currUser?.user?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				});
				toast.success('Cập nhật sản phẩm thành công');
			} else {
				response = await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
					headers: {
						Authorization: `Bearer ${currUser?.user?.token}`,
						'Content-Type': 'multipart/form-data',
					},
				});
				toast.success('Thêm sản phẩm thành công');
			}

			setIsModalOpen(false);
			getAllProducts();
			resetForm();
		} catch (err) {
			console.error(err);
			toast.error(editProduct ? 'Có lỗi khi cập nhật sản phẩm' : 'Có lỗi khi thêm sản phẩm');
		}
	};

	const handleEdit = (product) => {
		setEditProduct(product);
		setNewProduct({
			name: product.name,
			price: product.price,
			categoryId: 2,
			staticImg: null,
			dynamicImg: null,
		});
		setIsModalOpen(true);
	};

	const handleDeleteProduct = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
				headers: {Authorization: `Bearer ${currUser?.user?.token}`},
			});
			setProducts(products.filter((item) => item.id !== id));
			setIsDeleteOpen(false);
			toast.success('Xóa thành công');
		} catch (err) {
			console.error(err);
			toast.error('Có lỗi khi xóa');
		}
	};

	// Pagination calculations
	const totalPages = Math.ceil(products.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
	console.log('curr product', currentProducts);

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
			<button
				onClick={() => {
					resetForm();
					setIsModalOpen(true);
				}}
				type='button'
				className='bg-red-700 text-white p-2 rounded-lg'
			>
				Thêm sản phẩm
			</button>
			<div className='p-4'></div>

			{products.length > 0 ? (
				<div className='overflow-x-auto shadow-md sm:rounded-lg'>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
							<tr>
								<th scope='col' className='px-6 py-3'>
									#
								</th>
								<th scope='col' className='px-6 py-3'>
									Tên Sản Phẩm
								</th>
								<th scope='col' className='px-6 py-3'>
									Ảnh
								</th>
								<th scope='col' className='px-6 py-3'>
									Đơn giá
								</th>
								<th scope='col' className='px-6 py-3'>
									Màu sắc
								</th>
								<th scope='col' className='px-6 py-3'>
									Kích cỡ
								</th>
								<th scope='col' className='px-6 py-3'>
									Số lượng hàng tồn kho
								</th>
								<th scope='col' className='px-6 py-3'>
									Chức năng
								</th>
							</tr>
						</thead>
						<tbody>
							{currentProducts.map((prd, index) =>
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
											<div className='flex space-x-2'>
												<button onClick={() => handleEdit(prd)} className='bg-blue-500 text-white px-2 py-1 rounded'>
													Edit
												</button>
												<button
													onClick={() => setIsDeleteOpen(true)}
													className='bg-red-500 text-white px-2 py-1 rounded'
												>
													Delete
												</button>
												{isDeleteOpen && (
													<div
														id='deleteModal'
														className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-slate-700 bg-opacity-10'
													>
														<div className='relative p-4 w-full max-w-md h-full md:h-auto'>
															<div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
																<button
																	onClick={() => setIsDeleteOpen(false)}
																	className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
																>
																	<svg
																		aria-hidden='true'
																		className='w-5 h-5'
																		fill='currentColor'
																		viewBox='0 0 20 20'
																		xmlns='http://www.w3.org/2000/svg'
																	>
																		<path
																			fillRule='evenodd'
																			d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
																			clipRule='evenodd'
																		></path>
																	</svg>
																	<span className='sr-only'>Close modal</span>
																</button>
																<svg
																	className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
																	aria-hidden='true'
																	fill='currentColor'
																	viewBox='0 0 20 20'
																	xmlns='http://www.w3.org/2000/svg'
																>
																	<path
																		fillRule='evenodd'
																		d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
																		clipRule='evenodd'
																	></path>
																</svg>
																<p className='mb-4 text-gray-500 dark:text-gray-300'>
																	Are you sure you want to delete this product?
																</p>
																<div className='flex justify-center items-center space-x-4'>
																	<button
																		onClick={() => setIsDeleteOpen(false)}
																		className='py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
																	>
																		No, cancel
																	</button>
																	<button
																		onClick={() => handleDeleteProduct(prd.id)}
																		className='py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
																	>
																		Yes, I'm sure
																	</button>
																</div>
															</div>
														</div>
													</div>
												)}
											</div>
										</td>
									</tr>
								))
							)}
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
						{Array.from({length: totalPages}, (_, index) =>
							index === 0 || index === totalPages - 1 || (index >= currentPage - 1 && index <= currentPage + 1) ? (
								<button
									key={index + 1}
									onClick={() => handlePageClick(index + 1)}
									className={`px-4 py-2 rounded-lg ${
										currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
									}`}
								>
									{index + 1}
								</button>
							) : index === currentPage - 2 || index === currentPage + 2 ? (
								<span key={index + 1} className='px-4 py-2 text-gray-300'>
									...
								</span>
							) : null
						)}
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
			{/**modal add or edit */}
			{isModalOpen && (
				<div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-gray-900 bg-opacity-50'>
					<div className='relative p-9 w-full max-w-md max-h-full'>
						<div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
							<div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									{editProduct ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
								</h3>
								<button
									onClick={() => {
										setIsModalOpen(false);
										resetForm();
									}}
									type='button'
									className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
								>
									<svg
										className='w-3 h-3'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 14 14'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
										/>
									</svg>
								</button>
							</div>
							<form className='p-4 md:p-5' onSubmit={handleSubmit}>
								<div className='grid gap-4 mb-4 grid-cols-2'>
									<div className='col-span-2'>
										<label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
											Tên sản phẩm
										</label>
										<input
											type='text'
											name='name'
											id='name'
											value={newProduct.name}
											onChange={handleInputChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
											required
										/>
									</div>

									<div className='col-span-2'>
										<label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
											Giá sản phẩm
										</label>
										<input
											type='number'
											name='price'
											id='price'
											value={newProduct.price}
											onChange={handleInputChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
											required
										/>
									</div>

									<div className='col-span-2'>
										<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Ảnh tĩnh</label>
										<FileUploader
											handleChange={handleStaticFileChange}
											name='staticImg'
											types={fileTypes}
											maxSize={5}
											label='Upload or drop a file right here'
										/>
										{editProduct && !newProduct.staticImg && (
											<p className='text-sm text-gray-500 mt-1'>
												Current image will be kept if no new image is uploaded
											</p>
										)}
									</div>

									<div className='col-span-2'>
										<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Ảnh động</label>
										<FileUploader
											handleChange={handleDynamicFileChange}
											name='dynamicImg'
											types={fileTypes}
											maxSize={5}
											label='Upload or drop a file right here'
										/>
										{editProduct && !newProduct.dynamicImg && (
											<p className='text-sm text-gray-500 mt-1'>
												Current image will be kept if no new image is uploaded
											</p>
										)}
									</div>

									{/* Hiển thị ảnh đã kéo vào */}
									{staticImgUrl && (
										<div className='mb-4'>
											<img src={staticImgUrl} alt='Static Preview' className='w-20 h-20 object-cover' />
										</div>
									)}
									{dynamicImgUrl && (
										<div className='mb-4'>
											<img src={dynamicImgUrl} alt='Dynamic Preview' className='w-20 h-20 object-cover' />
										</div>
									)}

									<div className='col-span-2'>
										<label
											htmlFor='categoryId'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
										>
											Danh mục
										</label>
										<select
											name='categoryId'
											id='categoryId'
											value={newProduct.categoryId}
											onChange={handleInputChange}
											className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
											required
										>
											<option value=''>Chọn danh mục</option>
											{categories.map((category) => (
												<option key={category.id} value={category.id}>
													{category.name}
												</option>
											))}
										</select>
									</div>
								</div>
								<button
									type='submit'
									className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
								>
									{editProduct ? 'Cập nhật' : 'Thêm mới'}
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminProduct;
