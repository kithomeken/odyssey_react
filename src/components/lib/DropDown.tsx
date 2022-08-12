/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

interface Props {
    menuItems: any,
}

export const DropDown: FC<Props> = ({ menuItems }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    return (
        <Menu as="div" className="relative inline-block text-left float-right">
            {({ open }) => (
                <>
                    <div className='flex flex-row w-full'>
                        <Menu.Button
                            className={
                                classNames(
                                    open ? 'bg-gray-200' : null,
                                    "flex justify-center w-6 rounded border-0 border-gray-300 shadow-sm py-1 bg-white text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-0 focus:ring-offset focus:ring-offset-gray-100 focus:ring-emerald-500 align-middle"
                                )
                            }>
                            <div className='h-5 w-5'>
                                <span className="far fa-ellipsis-h fa-lg text-gray-500 m-auto"></span>
                            </div>
                        </Menu.Button>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {menuItems}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}
