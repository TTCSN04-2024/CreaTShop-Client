import React, { useEffect, useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import useAuth from '../hook/useAuth';
import {FaShoppingCart} from 'react-icons/fa';
import useCart from '../hook/useCart';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
const Header = () => {
	const currentUser = useAuth();
	const {clearUser} = useAuth();
	const {cart} = useCart();
	const [cartItemCount, setCartItemCount] = useState(0);
	const getAllCart = async() =>{
		try{
			const res = await axios.get(`${import.meta.env.VITE_API_URL}/carts`, {
				headers: {
					'Authorization': `Bearer ${currentUser?.user?.token}`
				}
			})
			setCartItemCount(res.data.data.length)

		}
		catch(err){
		    // toast.error(err.message)
		}
	}

	useEffect(()=>{
		getAllCart()
		
	},[cartItemCount])

	const handleLogout = () => {
		clearUser();
		window.location.href = '/';
	};

	return (
		<>
			<header className='bg-white shadow fixed w-full z-10'>
				<div className='container mx-auto px-4 py-4'>
					<nav className='flex justify-around items-center'>
						<Link to={'/'} className='text-2xl font-bold' style={{fontFamily: 'cursive'}}>
							CreaT
						</Link>
						<ul className='flex space-x-4'>
							<NavLink
								to='/'
								className={({isActive}) =>
									`relative group inline-block hover:underline hover:transition-all hover:text-slate-500 ${
										isActive ? 'border-b-2 border-slate-500' : ''
									}`
								}
							>
								Home
							</NavLink>
							<NavLink
								to='/shop'
								className={({isActive}) =>
									`relative group inline-block hover:underline hover:transition-all hover:text-slate-500 ${
										isActive ? 'border-b-2 border-slate-500' : ''
									}`
								}
							>
								Shop
							</NavLink>
						</ul>
						<div className=''>
							<input
								type='text'
								placeholder='Search....'
								className='border-2 border-gray-300 rounded-md py-2 px-4 w-full'
							/>
						</div>
						<div className='flex items-center space-x-6'>
							{/** Giỏ hàng */}
							<div>
								<Link to={'/cart'} className='relative'>
									<FaShoppingCart className='text-2xl' />
									{/**Biểu tượng số lượng sản phẩm */}
									{cartItemCount > 0 ? (
										<div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
											{cartItemCount}
										</div>
									):(
										<div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
											{cartItemCount}
										</div>
									)}
								</Link>
							</div>

							{/** Kiểm tra trạng thái đăng nhập */}
							{currentUser?.user?.token ? (
								<div className='relative group'>
									<button className='flex items-center space-x-2'>
										<i className='fas fa-user-circle text-2xl'></i>
										<span>Xin chào, {currentUser.user.firstName}</span>
									</button>
									<ul className='absolute right-0 mt-2 w-48 bg-white rounded shadow-lg hidden group-hover:block'>
										<li className='px-4 py-3 hover:bg-blue-500 hover:text-white'>
											<Link to='/profile'>Profile</Link>
										</li>
										{currentUser.user?.roles === 'ROLE_ADMIN' && (
											<li className='px-4 py-3 hover:bg-blue-500 hover:text-white'>
												<Link to='/admin/dashboard'>Admin</Link>
											</li>
										)}
										<li className='px-4 py-3 hover:bg-blue-500 hover:text-white'>
											<button onClick={handleLogout}>Logout</button>
										</li>
									</ul>
								</div>
							) : (
								<NavLink to='/login'>Login</NavLink>
							)}
						</div>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
