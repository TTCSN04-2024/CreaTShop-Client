import React, {useEffect, useState} from 'react';
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import toast, {Toaster} from 'react-hot-toast';
import SidebarAdmin from '../SideBarAdmin/SidebarAdmin';
import HeaderAdmin from '../../common/HeaderAdmin';

const AdminRoute = () => {
	const {user} = useAuth();
	const navigate = useNavigate();
	const [isAuthorized, setIsAuthorized] = useState(null);
	console.log(user)

	useEffect(() => {
		if (user && user.roles.includes('ROLE_ADMIN')) {
			setIsAuthorized(true);
		} else {
			setIsAuthorized(false);
			navigate('/login', {replace: true});
			toast.error('Bạn không có quyền truy cập trang này');
		}
	}, [user, navigate]);

	return isAuthorized ? (
		<>
			<div className='flex h-full'>
				<SidebarAdmin />
				<div className='flex-1 flex flex-col'>
					<HeaderAdmin />
					<Outlet />
				</div>
			</div>
		</>
	) : null;
};

export default AdminRoute;
