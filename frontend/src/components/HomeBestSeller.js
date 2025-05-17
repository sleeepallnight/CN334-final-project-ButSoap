'use client'

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomeBestSeller() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/products/`)
            .then((res) => {
                const bestsellerProducts = res.data.filter(p => p.is_bestseller);
                setProducts(bestsellerProducts);
            })
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
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl text-gray-700 font-semibold mb-6">Saponé</h1>
            <p className="text-[#777777] font-medium  mb-4 ml-6">
                <span className='font-semibold text-[#4B7474] ml-10 text-xl'> Saponé ไม่ใช่แค่สบู่ แต่คือทางเลือกของการดูแลตัวเองอย่างอ่อนโยนและใส่ใจโลก </span> ด้วยความตั้งใจในการใช้ส่วนผสมจากธรรมชาติที่สะอาด ปลอดภัย และเป็นมิตรต่อสิ่งแวดล้อม เรารังสรรค์ทุกสูตรจากสารสกัดออร์แกนิกแท้ เช่น ชาเขียว ดอกคาเลนดูล่า และเลมอน ผสานเข้ากับน้ำมันธรรมชาติที่ช่วยบำรุงผิวให้ชุ่มชื้นและสดชื่นอย่างเป็นธรรมชาติ ปราศจากสารเคมีรุนแรง กลิ่นสังเคราะห์ และสิ่งเจือปนที่ไม่จำเป็น Saponé จึงเป็นสบู่ที่ไม่เพียงแค่ทำความสะอาด แต่ยังช่วยคืนความสมดุลให้ผิวและส่งต่อความรู้สึกดีจากธรรมชาติอย่างแท้จริง เพราะเรายึดมั่นว่า… การดูแลตัวเอง ควรเป็นสิ่งที่ดีต่อทั้งตัวคุณและโลกที่คุณอยู่
            </p>
            <button className='mb-10 ml-5 px-4 py-2 bg-[#748837] text-white rounded-lg cursor-pointer hover:bg-[#5b6834]'>
                View All Menu
            </button>

            <h2 className="text-3xl text-gray-700 font-semibold mb-10">Best Seller</h2>
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
    );
}
