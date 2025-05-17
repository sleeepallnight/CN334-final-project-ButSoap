'use client'

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products/`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = async (productId) => {
    let session_id = localStorage.getItem('session_id');
    if (!session_id) {
      session_id = crypto.randomUUID();
      localStorage.setItem('session_id', session_id);
    }

    try {
      await axios.post(`${API_BASE_URL}/api/cart/add/`, {
        session_id,
        product_id: productId,
        quantity: 1
      });
      alert("เพิ่มสินค้าลงตะกร้าแล้ว!");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("ไม่สามารถเพิ่มสินค้าได้");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl text-[#696767] font-semibold mb-10">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-[#CECECE] rounded-lg shadow-sm h-full flex flex-col cursor-pointer">
              <Link href={`/product/${product.id}`}>
                <img src={product.image} alt={product.nameEN} className="w-full h-40 object-cover rounded-t-lg" />
              </Link>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-[#777777] font-semibold mb-2">{product.nameEN}</h3>
                  <p className="text-[#777777]">{product.price} ฿</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-10 h-10 bg-[#748837] hover:bg-[#5b6834] text-white font-bold py-1 px-2 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
