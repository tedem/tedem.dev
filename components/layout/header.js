import * as React from "react";
import { Menu, Transition } from "@headlessui/react";

import Link from "next/link";

import Holder from "../layout/holder";

export default function Header() {
  return (
    <header>
      <Holder>
        <div className="flex items-center py-8 border-b border-gray-700">
          <div className="flex">
            <Link href="/">
              <a
                className="flex items-center text-2xl tracking-wide group"
                rel="home"
              >
                <span className="text-indigo-300 transition group-hover:text-indigo-100">
                  tedem
                </span>
                <span className="text-gray-300 transition group-hover:text-gray-100">
                  .dev
                </span>
              </a>
            </Link>
          </div>
          <nav className="hidden ml-auto space-x-12 lg:flex">
            <Link href="/">
              <a className="flex items-center text-gray-300 transition hover:text-gray-100 focus:outline-none focus:text-indigo-100">
                <span className="whitespace-nowrap">Merkez</span>
              </a>
            </Link>
            <Link href="/blog">
              <a className="flex items-center text-gray-300 transition hover:text-gray-200 focus:outline-none focus:text-indigo-200">
                <span className="whitespace-nowrap">Blog</span>
              </a>
            </Link>
            <Link href="/bookmarks">
              <a className="flex items-center text-gray-300 transition hover:text-gray-200 focus:outline-none focus:text-indigo-200">
                <span className="whitespace-nowrap">Bookmarks</span>
              </a>
            </Link>
            <Link href="/about">
              <a className="flex items-center text-gray-300 transition hover:text-gray-200 focus:outline-none focus:text-indigo-200">
                <span className="whitespace-nowrap">Hakkımda</span>
              </a>
            </Link>
            <Link href="/contact">
              <a className="flex items-center text-gray-300 transition hover:text-gray-200 focus:outline-none focus:text-indigo-200">
                <span className="whitespace-nowrap">İletişim</span>
              </a>
            </Link>
          </nav>
          <Menu>
            {({ open }) => (
              <div className="relative inline-block ml-auto lg:hidden">
                <Menu.Button
                  className={`flex items-center justify-center w-12 h-12 -my-4 transition bg-gray-700 text-indigo-300 border ${
                    open
                      ? "border-indigo-400 ring-4 ring-gray-700"
                      : "border-transparent"
                  } rounded-full hover:border-indigo-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-gray-700`}
                >
                  <svg
                    className="w-auto h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={`${
                        !open
                          ? "M4 6h16M4 12h16M4 18h16"
                          : "M6 18L18 6M6 6l12 12"
                      }`}
                    />
                  </svg>
                  <span className="sr-only">Menu</span>
                </Menu.Button>
                <Transition
                  className="absolute right-0 origin-top-right"
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="w-56 mt-8 bg-gray-700 divide-y divide-gray-600 rounded-lg shadow-xl outline-none"
                    static
                  >
                    <div className="flex flex-col py-2">
                      <Menu.Item href="/">
                        <a className="flex w-full px-4 py-2 text-gray-300 transition hover:bg-gray-600 hover:text-gray-100 focus:outline-none focus:bg-indigo-500 focus:text-indigo-100">
                          <span className="text-sm whitespace-nowrap">
                            Merkez
                          </span>
                        </a>
                      </Menu.Item>
                      <Menu.Item href="/blog">
                        <a className="flex w-full px-4 py-2 text-gray-300 transition hover:bg-gray-600 hover:text-gray-100 focus:outline-none focus:bg-indigo-500 focus:text-indigo-100">
                          <span className="text-sm whitespace-nowrap">
                            Blog
                          </span>
                        </a>
                      </Menu.Item>
                      <Menu.Item href="/bookmarks">
                        <a className="flex w-full px-4 py-2 text-gray-300 transition hover:bg-gray-600 hover:text-gray-100 focus:outline-none focus:bg-indigo-500 focus:text-indigo-100">
                          <span className="text-sm whitespace-nowrap">
                            Bookmarks
                          </span>
                        </a>
                      </Menu.Item>
                      <Menu.Item href="/about">
                        <a className="flex w-full px-4 py-2 text-gray-300 transition hover:bg-gray-600 hover:text-gray-100 focus:outline-none focus:bg-indigo-500 focus:text-indigo-100">
                          <span className="text-sm whitespace-nowrap">
                            Hakkımda
                          </span>
                        </a>
                      </Menu.Item>
                      <Menu.Item href="/contact">
                        <a className="flex w-full px-4 py-2 text-gray-300 transition hover:bg-gray-600 hover:text-gray-100 focus:outline-none focus:bg-indigo-500 focus:text-indigo-100">
                          <span className="text-sm whitespace-nowrap">
                            İletişim
                          </span>
                        </a>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            )}
          </Menu>
        </div>
      </Holder>
    </header>
  );
}
