'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }) {
  const { id } = params; 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    console.log("API_BASE_URL:", API_BASE_URL);
  }, []);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  // สร้าง session_id ถ้ายังไม่มี
  useEffect(() => {
    const session = localStorage.getItem('session_id');
    if (!session) {
      const newId = crypto.randomUUID();
      localStorage.setItem('session_id', newId);
    }
  }, []);



  const router = useRouter();

  const handleBuyNow = async () => {
    const session_id = localStorage.getItem('session_id');

    try {
      await axios.post(`${API_BASE_URL}/api/cart/add/`, {
        session_id,
        product_id: product.id,
        quantity,
      });
      router.push('/checkout');
    } catch (error) {
      console.error("Buy now error:", error);
      alert("ไม่สามารถดำเนินการซื้อได้");
    }
  };


  const handleAddToCart = async () => {
    const session_id = localStorage.getItem('session_id');
    try {
      await axios.post(`${API_BASE_URL}/api/cart/add/`, {
        session_id,
        product_id: product.id,
        quantity
      });
      alert("เพิ่มสินค้าลงตะกร้าแล้ว!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("ไม่สามารถเพิ่มสินค้าได้");
    }
  };

  if (!product) return <p className="p-10">Loading...</p>;



  return (
    <div className="flex flex-col items-center py-10 px-10">
      <div className="flex flex-col lg:flex-row max-w-6xl w-full gap-16">
        {/* Image */}
        <img
          src={product.image}
          alt={product.nameTH}
          className="w-full lg:w-[600px] rounded-3xl object-cover"
        />

        {/* Product Info */}
        <div className="flex-1 text-gray-800 space-y-5">
          <h1 className="text-2xl font-bold">{product.nameEN}</h1>
          <p className="text-xl text-[#4B7474]">{product.nameTH}</p>
          <hr className="border-t" />

          <p className="font-bold text-lg">
            ขนาด : <span className="text-[#7BB3C4]">{product.size}</span>
          </p>

          <p className="font-bold text-lg">
            คำอธิบาย : <span className="text-[#7BB3C4]">{product.description}</span>
          </p>

          <p className="font-bold text-lg">
            ราคารวม : <span className="text-[#7BB3C4]">{product.price} บาท</span>
          </p>

          <div className="mt-4">
            <label className="font-bold text-lg mr-2">จำนวนที่ต้องการสั่งซื้อ:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-3 py-1 w-24 rounded shadow-sm"
            />
          </div>

          <div className="mt-6 flex gap-6">
            <button
              onClick={handleAddToCart}
              className="bg-[#7BB3C4] hover:bg-[#638f9c] text-white px-6 py-2 rounded-3xl transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-[#4B7474] hover:bg-[#3b5b5b] text-white px-8 py-2 rounded-3xl transition"
            >
              Buy Now
            </button>

          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-6xl space-y-5 mt-10">
        <div className="h-px bg-gray-300 mx-auto my-8"></div>
        <div className="font-bold text-lg">Product Detail</div>

        <div className="font-bold text-lg">How to use</div>
        <p>{product.htu}</p>

        <div className="font-bold text-lg">Warning</div>
        <p>{product.warning}</p>

        <div className="font-bold text-lg">Ingredients</div>
        <p>{product.ingredient}</p>
      </div>
    </div>
  );
}