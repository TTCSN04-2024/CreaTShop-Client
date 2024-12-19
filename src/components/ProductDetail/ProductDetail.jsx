import axios from 'axios';
import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {useParams} from 'react-router-dom';
import useCart from '../../hook/useCart';
import useAuth from '../../hook/useAuth';

const ProductDetail = () => {
	const { id } = useParams();
	const myCart = useCart();
	const authen = useAuth(); // Thêm authentication
	const [productData, setProductData] = useState(null);
	const [quantity, setQuantity] = useState(1);
  
	const getProductDetail = async () => {
	  try {
		const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
		const { data } = res.data;
		setProductData(data);
		console.log(data)
	  } catch (err) {
		console.error('Error fetching product details:', err);
		toast.error('Failed to fetch product details.');
	  }
	};
  
	const handleIncrease = () => {
		setQuantity(prev => prev + 1);
	};
  
	const handleDecrease = () => {
		if (quantity > 1) {
		  setQuantity(prev => prev - 1);
		}
	  };
  
	  const handleAddToCart = async () => {
		try {
		  // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
		  const cartResponse = await axios.get(
			`${import.meta.env.VITE_API_URL}/carts`,
			{
			  headers: {
				Authorization: `Bearer ${authen?.user?.token}`
			  }
			}
		  );
	
		  // Tìm sản phẩm trong giỏ hàng
		  const existingItem = cartResponse.data.data.find(item => 
			item.productResponse.id === productData.id && 
			item.productDetail.id === productData.variants[0].id
		  );
	
		  if (existingItem) {
			// Nếu sản phẩm đã tồn tại, cập nhật số lượng
			const updateItemInCart = await axios.put(
			  `${import.meta.env.VITE_API_URL}/carts/${existingItem.id}`,
			  {
				productId: productData.id,
				variantId: productData.variants[0]?.id || 0,
				quantity: existingItem.quantity + quantity
			  },
			  {
				headers: {
				  Authorization: `Bearer ${authen?.user?.token}`
				}
			  }
			);
			toast.success('Cập nhật giỏ hàng thành công!');
		  } else {
			// Nếu sản phẩm chưa tồn tại, thêm mới
			const res = await axios.post(
			  `${import.meta.env.VITE_API_URL}/carts`,
			  {
				productId: productData.id,
				variantId: productData.variants[0]?.id || 0,
				quantity: quantity
			  },
			  {
				headers: {
				  Authorization: `Bearer ${authen?.user?.token}`
				}
			  }
			);
			toast.success('Thêm vào giỏ hàng thành công!');
		  }
	
		  // Reset quantity sau khi thêm thành công
		  setQuantity(1);
		  
		} catch (err) {
		  toast.error(err.message || 'Có lỗi xảy ra khi thêm vào giỏ hàng');
		}
	  };
  
	useEffect(() => {
	  getProductDetail();
	}, []);
  
	return (
	  <div className='h-screen pt-24'>
		<div className='container mx-auto px-4'>
		  <div className='flex justify-center items-center'>
			<div className='w-1/2 bg-slate-300'>
			  <h1 className='text-3xl font-bold'>Product Detail</h1>
			  {productData && (
				<div className='container mx-auto px-4'>
				  <div className='flex justify-between items-center gap-3'>
					<div className='w-1/2'>
					  <img
						src={productData?.imageStaticUrl}
						alt={productData?.name}
						className='w-full h-full object-cover'
					  />
					</div>
					<div className='w-1/2'>
					  <h2 className='text-2xl font-bold'>{productData?.name}</h2>
					  <p className='text-gray-600'>Giá: {productData?.price} VNĐ</p>
					  <div className='mt-4'>
						<h2>Variants:</h2>
						<div className='flex items-center'>
						  <button
							onClick={handleDecrease}
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
						  >
							-
						  </button>
						  <input
							className='border border-gray-400 px-2 py-2 w-14 text-center'
							value={quantity}
							readOnly
						  />
						  <button
							onClick={handleIncrease}
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
						  >
							+
						  </button>
						  <button
							onClick={handleAddToCart}
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'
						  >
							Thêm vào giỏ hàng
						  </button>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  )}
			</div>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default ProductDetail;
  