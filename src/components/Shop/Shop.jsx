import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from '../Card';
import {NavLink} from 'react-router-dom';

const Shop = () => {
	const [product, setProduct] = useState([]); // Danh sách sản phẩm ban đầu
	const [sortedProducts, setSortedProducts] = useState([]); // Danh sách sản phẩm đã sắp xếp
  const [activeFilter, setActiveFilter] = useState(null);

	const getAllProduct = async () => {
		try {
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
			console.log('result data', res.data.data);
			setProduct(res.data.data);
			setSortedProducts(res.data.data); // Khởi tạo danh sách sắp xếp
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProduct();
	}, []);

	// Hàm sắp xếp
	const sortProducts = (order) => {
    setActiveFilter(order);
		const sorted = [...product].sort((a, b) => {
			if (order === 'asc') {
				return a.price - b.price; // Sắp xếp giá tăng dần
			} else {
				return b.price - a.price; // Sắp xếp giá giảm dần
			}
		});
		setSortedProducts(sorted);
	};

	return (
		<div className='flex mb-5'>
			{/* Sidebar */}
			<aside className='w-56 p-4 bg-gray-100'>
				<h2 className='font-bold mb-2'>Filters</h2>
				<button
					onClick={() => sortProducts('asc')}
					className={`block w-full text-left mb-2 p-2 border rounded
          ${activeFilter === 'asc' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
				>
					Giá: Thấp đến Cao
				</button>
				<button
					onClick={() => sortProducts('desc')}
					className={`block w-full text-left mb-2 p-2 border rounded
          ${activeFilter === 'desc' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
				>
					Giá: Cao đến Thấp
				</button>
			</aside>

			{/* Danh sách sản phẩm */}
			<div className='container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2'>
				{sortedProducts.length > 0 ? (
					sortedProducts.map((item, index) => <Card key={index} product={item} />)
				) : (
					<p>No products available</p>
				)}
			</div>
		</div>
	);
};

export default Shop;
