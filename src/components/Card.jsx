import { toast } from 'react-hot-toast';

const Card = (props) => {
  const handleAddToCart = () => {
    toast.loading('Updating...', { id: 'update-toast' });
    setTimeout(() => {
      toast.dismiss('update-toast'); 
      toast.success('Added to cart!');
    }, 2000);
  };

  return (
    <div className="relative group card border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
      <img src={props.product.image} alt={props.product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{props.product.name}</h3>
        <p className="text-gray-700">${props.product.price.toFixed(2)}</p>
      </div>
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleAddToCart}
          className="border border-black text-black py-2 px-4 rounded"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Card;