'use client'
import React from 'react';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="text-center mb-6">
        <div className="flex justify-center items-center gap-2">
          <img src="/assets/clover.png" alt="Clover" className="w-10 h-10" />
          <h1 className="text-5xl font-bold text-gray-800 mb-2">Saponé</h1>
          <img src="/assets/clover.png" alt="Clover" className="w-10 h-10" />
        </div>
      </div>

      <div className="w-full max-w-md border p-8 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-6">Log In</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input type="email" className="w-full px-4 py-2 bg-gray-100 rounded" />
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input type="password" className="w-full px-4 py-2 bg-gray-100 rounded" />
        </div>

        <div className="text-right text-xs text-gray-500 mb-4 cursor-pointer">Forgot Password?</div>

        <button className="w-full bg-[#8ED6DC] text-white font-bold py-2 rounded-full mb-4">
          LOGIN →
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account yet?{' '}
          <Link href="/register" className="text-pink-500 font-medium">
            Sign Up for Free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
