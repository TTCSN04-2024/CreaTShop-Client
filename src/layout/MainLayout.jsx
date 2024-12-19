import Header from '../common/Header';
import {Outlet} from 'react-router-dom';
import Footer from '../common/Footer';
import {Toaster} from 'react-hot-toast';
const MainLayout = () => {
	return (
		<div>
			<Toaster
				position='top-left'
				reverseOrder={false}
				toastOptions={{
					duration: 980,
				}}
				limit={10}
			/>
			<Header />
			<div className='container'>
				<div className='row'>
					<div className='flex-grow'>
						<Outlet />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default MainLayout;
