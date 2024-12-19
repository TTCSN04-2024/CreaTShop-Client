import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '../Card';

const Shop = () => {
  const [product, setProduct] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      console.log('result data', res.data.data);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="pt-24 flex ">
      <aside className='w-56'>
        Category
      </aside>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {product.map((item, index) => (
            <Card key={index} product={item}/>
        ))}
      </div>
    </div>
  );
};

export default Shop;
