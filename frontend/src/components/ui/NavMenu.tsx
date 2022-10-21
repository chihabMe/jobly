import { Menu, Transition } from "@headlessui/react";
import {
    ChevronDownIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import linkObject from "src/models/linkObject";

const NavMenu = ({
    text,
    linksObjects,
}: {
    text: string;
    linksObjects: linkObject[];
}) => {
    return (
        <Menu as="div" className="relative    text-left">
            <Menu.Button className="flex   font-medium text-title items-center gap-2 capitalize hover:text-primary ">
                {text}
                <ChevronDownIcon className="w-3 h-3" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items
                    as="ul"
                    className="md:absolute w-full md:w-48  z-50   text-sm flex flex-col  py-4 mt-4 pl-6  capitalize top-full bg-bg  border border-title    rounded-md    "
                >
                    {linksObjects.map((item) => (
                        <Menu.Item as="li" className="py-2">
                            {({ active }) => (
                                <Link key={item.path + item.name} href={item.path}>
                                    <span
                                        className={`${active && "text-blue-300 pl-1"
                                            }  transition-all duration-300 cursor-pointer  py-2 `}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default NavMenu;
