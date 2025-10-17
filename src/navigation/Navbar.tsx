import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { IAppConfig } from '../utils/Content';

interface INavbarProps {
  config: IAppConfig;
}
interface ILink {
  name: string;
  url: string;
}

const ChevronDownIcon = ({ visible }: { visible: boolean }) => (
  <svg
    className={`ml-1 w-4 h-4 transition-transform duration-300 ${
      visible ? 'rotate-180' : ''
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

function GroupPageLink({ name, urls }: { name: string; urls: Array<ILink> }) {
  const [visible, setVisible] = useState(false);
  const enterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => setVisible(true), 80);
  };
  const handleMouseLeave = () => {
    if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(() => setVisible(false), 150);
  };
  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) clearTimeout(enterTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-2 px-3 flex items-center cursor-pointer select-none text-base font-semibold text-gray-700 hover:text-blue-700 transition duration-200">
        <span>{name}</span>
        <ChevronDownIcon visible={visible} />
      </div>
      <ul
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[200px] bg-white rounded-xl shadow-2xl py-2 transition-all duration-300 origin-top ${
          visible
            ? 'opacity-100 scale-y-100 visible z-50'
            : 'opacity-0 scale-y-95 invisible'
        }`}
      >
        {urls.map((u) => (
          <li key={u.name}>
            <Link href={u.url} passHref>
              <a className="block px-5 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition duration-200">
                {u.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ...existing code...
const Navbar = (_props: INavbarProps) => {
  const navbarRef = useRef<HTMLHeadElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const isMobile = window.innerWidth < 768;
      const isScrolled = window.scrollY > 40;
      if (!isMobile) {
        if (isScrolled) {
          navbarRef.current.classList.add(
            'py-2',
            'shadow-md',
            'bg-white/40',
            'backdrop-blur-lg'
          );
          navbarRef.current.classList.remove('py-5', 'shadow-xl', 'bg-white');
        } else {
          navbarRef.current.classList.add(
            'py-5',
            'shadow-xl',
            'bg-white/40',
            'backdrop-blur-lg'
          );
          navbarRef.current.classList.remove('py-2', 'shadow-md');
        }
      } else {
        navbarRef.current.classList.add(
          'py-4',
          'shadow-lg',
          'bg-white/40',
          'backdrop-blur-lg'
        );
        navbarRef.current.classList.remove('py-2', 'bg-white');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      ref={navbarRef}
      className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/40 backdrop-blur-lg shadow-xl py-5"
      style={{ fontFamily: 'Inter, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" passHref>
          <a aria-label="Home" className="flex items-center gap-3 min-w-0">
            <img
              src="/Logo TN7EDU.png"
              className="h-12 w-auto object-contain drop-shadow-md rounded-xl bg-white/40 backdrop-blur-lg"
              alt="TN7 Solutions Logo"
            />
            <span className="hidden md:inline text-lg md:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight truncate">
              TN7 EDU
            </span>
          </a>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-blue-700 focus:outline-none ml-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>

        {/* Menu */}
        <nav
          className={`
            ${isMenuOpen ? 'block' : 'hidden'}
            md:flex md:items-center md:space-x-2
            absolute md:static top-full left-0 right-0
            bg-white/95 md:bg-transparent shadow-lg md:shadow-none
            mt-2 md:mt-0 px-2 sm:px-4 md:px-0 py-4 md:py-0
            transition-all duration-300
          `}
        >
          <ul className="flex flex-col md:flex-row gap-2 md:gap-0 list-none w-full md:w-auto">
            <li>
              <Link href="/" passHref>
                <a className="block py-2 px-4 text-gray-700 hover:text-blue-700 font-semibold transition duration-200 rounded-lg whitespace-nowrap">
                  Trang chủ
                </a>
              </Link>
            </li>
            <li>
              <GroupPageLink
                name="Giới thiệu"
                urls={[
                  { name: 'Về chúng tôi', url: '/about-us' },
                  { name: 'Câu hỏi thường gặp', url: '/pages2/cauhoi' },
                ]}
              />
            </li>
            {[
              { name: 'Khóa học', url: '/pages2/khoahoc' },
              { name: 'Học phí & Ưu đãi', url: '/pages2/hocphi' },
              { name: 'Liên hệ', url: '/hop-tac' },
            ].map((item) => (
              <li key={item.name}>
                <Link href={item.url} passHref>
                  <a className="block py-2 px-4 text-gray-700 hover:text-blue-700 font-semibold transition duration-200 rounded-lg whitespace-nowrap">
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
            <li className="md:hidden">
              <GroupPageLink
                name={'Blog'}
                urls={[
                  { name: 'Tin Mới', url: '/blogs/category/tin-tuc-hay' },
                  { name: 'Tuyển Dụng', url: '/pages2/tuyendung' },
                ]}
              />
            </li>
          </ul>
          {/* Blog group only on desktop */}
          <div className="hidden md:block">
            <GroupPageLink
              name={'Blog'}
              urls={[
                { name: 'Tin Mới', url: '/blogs/category/tin-tuc-hay' },
                { name: 'Tuyển Dụng', url: '/pages2/tuyendung' },
              ]}
            />
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-center ml-0 md:ml-4 w-full md:w-auto mt-4 md:mt-0">
            <a
              href="https://zalo.me/0763771191"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 text-[16px] md:text-[18px] bg-white border border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 shadow-md hover:shadow-lg w-full md:w-auto justify-center"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M22 16.92V19a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h2.09a2 2 0 012 1.72c.13 1.13.37 2.24.72 3.31a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.58 6.58l1.27-1.27a2 2 0 012.11-.45c1.07.35 2.18.59 3.31.72A2 2 0 0122 16.92z"
                />
              </svg>
              <img
                src="https://res.cloudinary.com/farmcode/image/upload/v1748364890/ielts-test/zalo_q3w1pc.png"
                alt="Zalo"
                width={16}
                height={16}
                className="inline-block"
              />
              <span className="ml-1">0763.771.191</span>
            </a>
            <a
              href="https://test-ielts-tn7-edu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 text-base font-semibold text-white 
             bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 
             rounded-full shadow-md hover:shadow-xl
             hover:scale-105 transition-all duration-300 ease-in-out w-full md:w-auto justify-center"
            >
              <span className="tracking-wide">IELTS ONLINE</span>
              <svg
                className="w-5 h-5 animate-pulse"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M502.6 278.6l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L402.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h370.7L265.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8-.1 45.3z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
