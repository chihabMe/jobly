import Link from "next/link";
import {
  DocumentIcon,
  BriefcaseIcon,
  CogIcon,
  UserCircleIcon,
  UserIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import User from "src/models/User";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const profileLinks = [
  { href: "/profile", text: "profile", Icon: UserCircleIcon, id: 1 },
  { href: "/resume", text: "resume", Icon: DocumentIcon, id: 2 },
  { href: "/jobs", text: "jobs", Icon: BriefcaseIcon, id: 3 },
  { href: "/settings", text: "settings", Icon: CogIcon, id: 4 },
];

const HeaderProfileDisplay = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-6 items-center">
      <div>
        <BellIcon className="w-6 h-6  " />
      </div>
      <div className="cursor-pointer  hover:text-primary">
        <Menu as="div" className="relative">
          <div>
            <Menu.Button>
              <UserIcon className="w-6 h-6  " />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              as="ul"
              className="absolute flex flex-col dark:bg-bg-dark gap-2 right-0 px-2 py-4 md:py-6   mt-2 w-52 sm:w-72 md:w-96   border-none outline-none rounded-md bg-bg shadow-md ring-1   focus:outline-none"
            >
              <Menu.Item>
                <h1 className="px-2 pt-1 pb-4 cursor-pointer  font-bold text-title dark:text-title-dark">
                  chihab@email.com
                </h1>
              </Menu.Item>
              {profileLinks.map((item, index) => (
                <Menu.Item key={index} as={Fragment}>
                  {({ active }) => (
                    <li
                      className={`w-full py-2 px-2 hover:bg-primary   dark:text-title-dark  hover:text-white cursor-pointer text-title rounded-md ${
                        active && "text-primary "
                      } `}
                    >
                      <Link className="" href={item.href}>
                        <div className="capitalize md:text-lg  flex gap-4 items-center">
                          {<item.Icon className="h-4 w-4 sm:w-5 sm:h-5" />}
                          <span>{item.text}</span>
                        </div>
                      </Link>
                    </li>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default HeaderProfileDisplay;
