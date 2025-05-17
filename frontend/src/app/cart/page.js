'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const session_id = localStorage.getItem('session_id');
        if (!session_id) return;

        axios.get(`${API_BASE_URL}/api/cart/summary/${session_id}/`)
            .then(res => setCart(res.data))
            .catch(err => console.error("Error fetching cart summary:", err));
    }, []);

    if (!cart) return <div className="p-10 text-center">Cart Empty</div>;

    return (
        <div className="flex flex-col lg:flex-row gap-30 px-30 py-10">
            {/* LEFT - รายการสินค้าในตะกร้า */}
            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

                <div className="border-t border-gray-700">
                    <div className="grid grid-cols-[2fr_1fr_1fr] text-sm font-semibold text-gray-600 py-4">
                        <div>PRODUCT</div>
                        <div className="text-center">QUANTITY</div>
                        <div className="text-right">TOTAL</div>
                    </div>
                    <hr />

                    {cart.items.map((item) => (
                        <div
                            key={item.product_id}
                            className="grid grid-cols-[2fr_1fr_1fr] gap-4 py-6 border-b border-gray-300 items-start"
                        >
                            <div className="flex gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-25 h-20 object-cover flex-shrink-0"
                                />
                                <div>
                                    <p className="font-semibold text-gray-700">{item.nameEN}</p>
                                    <p className="text-sm text-gray-700">{item.nameTH}</p>
                                    <p className="text-sm text-gray-700">ขนาด {item.size}</p>
                                </div>
                            </div>

                            <div className="flex justify-center items-center pt-4">{item.quantity}</div>
                            <div className="text-right pt-4">{item.total_price} บาท</div>

                        </div>
                    ))}
                </div>
            </div>
            

            {/* RIGHT - สรุปยอด */}
            <div className="w-full lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Summary</h2>
                <div className="border-t border-gray-700 pt-4 text-sm text-gray-700 space-y-3">
                    <div className="flex justify-between font-semibold">
                        <span>SUBTOTAL</span>
                        <span>{cart.subtotal} บาท</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Shipping</span>
                        <span>{cart.shipping} บาท</span>
                    </div>
                    <div className="border-t border-gray-700 my-4"></div>
                    <div className="flex justify-between font-semibold">
                        <span>ESTIMATED TOTAL</span>
                        <span>{cart.estimated_total} บาท</span>
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => router.push('/checkout')} // ✅ เพิ่ม event นี้
                        className="bg-[#748837] text-white font-semibold py-2 px-6 rounded-3xl hover:bg-[#093C16] cursor-pointer"
                    >
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}