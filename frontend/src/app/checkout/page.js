'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const CheckoutPage = () => {
  const [summary, setSummary] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id) return;

    axios.get(`${API_BASE_URL}/api/cart/summary/${session_id}/`)
      .then(res => setSummary(res.data))
      .catch(err => console.error("Error fetching summary:", err));
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async () => {
    const session_id = localStorage.getItem("session_id");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/order/checkout/`, {
        ...formData,
        session_id,
        payment_cod: paymentMethod === 'cod',
        delivery_method: "standard", 
      });

      alert("สั่งซื้อสำเร็จแล้ว!");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
    }
  };

  if (!summary) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-30 px-30 py-10">
      {/* LEFT: Form */}
      <div className="flex-1 space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
          <div className="space-y-4">
            <input type="text" name="full_name" placeholder="ชื่อ-นามสกุล" className="w-full border border-gray-300 rounded-md px-4 py-2" onChange={handleInputChange} />
            <input type="text" name="address" placeholder="ที่อยู่" className="w-full border border-gray-300 rounded-md px-4 py-2" onChange={handleInputChange} />
            <input type="text" name="phone" placeholder="เบอร์โทร" className="w-full border border-gray-300 rounded-md px-4 py-2" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" className="w-full border border-gray-300 rounded-md px-4 py-2" onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">Payment</h2>
          <label className="flex items-center space-x-3">
            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
            <span>ชำระเงินปลายทาง</span>
          </label>
        </div>
      </div>

      {/* RIGHT: Summary */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
        <h2 className="text-2xl font-bold mb-6">Summary</h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{summary.subtotal} บาท</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{summary.shipping} บาท</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-4">
            <span>Total</span>
            <span>{summary.estimated_total} บาท</span>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleCheckout}
            className="bg-[#748837] text-white font-semibold py-2 px-6 rounded-3xl hover:bg-[#093C16] cursor-pointer"
          >
            order now
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;