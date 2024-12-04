import Slider from '../components/Slider/Slider'
import CardList from '../components/CardList'
const products = [
  {
    id: 1,
    name: "Adidas Samba",
    price: 33.36,
    image: "https://i.pinimg.com/736x/51/42/64/514264285a9e287d30d7b7970bf107dd.jpg", // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: 2,
    name: "Adidas Samba OG",
    price: 123.91,
    image: "https://i.pinimg.com/736x/2b/92/ee/2b92ee3f0572a2b51fb8b2b6d2a65b17.jpg",
  },
  {
    id: 3,
    name: "Hylane",
    price: 134.08,
    image: "https://i.pinimg.com/736x/b8/9b/74/b89b7460ccf818cd48884fccb51d8ab2.jpg",
  },
  {
    id: 4,
    name: "Puma 880",
    price: 124.16,
    image: "https://i.pinimg.com/736x/7f/17/ec/7f17ec6f79b81f78fb89568403f0f5d9.jpg",
  },
  {
    id: 5,
    name: "Sandal Calskin Beige",
    price: 12.39,
    image: "https://i.pinimg.com/736x/eb/2f/9b/eb2f9b05a2bb6c54dd9291919d644971.jpg",
  },
  {
    id: 5,
    name: "Sandal Calskin Beige",
    price: 12.39,
    image: "https://i.pinimg.com/736x/eb/2f/9b/eb2f9b05a2bb6c54dd9291919d644971.jpg",
  },
  {
    id: 5,
    name: "Sandal Calskin Beige",
    price: 12.39,
    image: "https://i.pinimg.com/736x/eb/2f/9b/eb2f9b05a2bb6c54dd9291919d644971.jpg",
  },
];
const Home = () => {
  return (
    <div>
      <Slider />
      <h1 className="text-center text-3xl font-bold mb-10">Home</h1>
      
      <div className="container mx-auto px-4">
        <h3 className="text-center text-2xl font-bold mb-10">Categories</h3>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 mb-10">
        <h3 className="text-center text-2xl font-bold mb-10">Feature Products</h3>
        <CardList products={products} />
      </div>
    </div>
  );
};

export default Home;