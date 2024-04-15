import React from "react";
import Image from "next/image";

interface NavItemProps {
  href: string;
  text: string;
}

export const Navbar = () => {
  return (
    <nav className="bg-gray-700 w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Logo />
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavItem href="#" text="Detalle de Productos" />
            <NavItem href="#" text="Mapa" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      {/* <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      /> */}
      Cosecha Local
    </div>
  );
};

const NavItem: React.FC<NavItemProps> = ({ href, text }) => {
  return (
    <a
      href={href}
      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
    >
      {text}
    </a>
  );
};

const MobileMenuButton: React.FC = () => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        type="button"
        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        {/* Icons for closed and open menu */}
        <svg
          className="block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* Icon when menu is closed */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <svg
          className="hidden h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* Icon when menu is open */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <span className="sr-only">Open main menu</span>
      </button>
    </div>
  );
};
