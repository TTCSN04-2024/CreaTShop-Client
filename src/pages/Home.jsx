import Slider from '../components/Slider/Slider';
import CardList from '../components/CardList';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [product, setProduct] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      const allProducts = res.data.data;

      // Lấy 8 sản phẩm ngẫu nhiên
      const shuffled = allProducts.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 12);
      setRandomProducts(selected);

      setProduct(allProducts); // Lưu toàn bộ sản phẩm nếu cần sử dụng
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []); // Thêm dependency array để tránh gọi API nhiều lần

  return (
    <div>
      <div className='pt-24'>
        <Slider />
      </div>
      <h1 className="text-center text-3xl font-bold mb-10">Home</h1>
      
      <div className="container mx-auto px-4">
        <h3 className="text-center text-2xl font-bold mb-10">Categories</h3>
        <CategoryCard />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 mb-10">
        <h3 className="text-center text-2xl font-bold mb-10">Feature Products</h3>
        <CardList products={randomProducts} />
      </div>
    </div>
  );
};

export default Home;
