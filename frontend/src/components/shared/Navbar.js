// components/Navbar.tsx
'use client'

import Link from "next/link";
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white sticky w-full z-20 top-0 start-0 border-b border-gray-200">
            <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-5 px-10 shadow-sm">
                <Link href="/" className="flex items-center space-x-4">
                    <img src="/assets/clover.png" alt="Logo" className="h-8" />
                    <span className="self-center text-2xl text-gray-700 font-semibold whitespace-nowrap">Saponé</span>
                </Link>
                {/* Hamburger button */}
                <div className="flex items-center md:order-2 md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg focus:outline-none"
                        aria-expanded={menuOpen}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" >
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* Menu items */}
                <div
                    className={`${menuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col text-xl p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white md:justify-end">
                        <li>
                            <Link href="/" className="block py-2 px-3 text-gray-700 font-semibold  hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-[#748837] md:p-0 " >Home</Link >
                        </li>
                        <li>
                            <Link href="/menu" className="block py-2 px-3 text-gray-700 font-semibold  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#748837] md:p-0">Menu</Link >
                        </li>
                        <li>
                            <Link href="/cart" className="block py-2 px-3 text-gray-700 font-semibold  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#748837] md:p-0">
                                <ShoppingBag />
                            </Link >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
