/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'

interface Props {
    label?: any,
    state: any,
    width?: any,
    listButton: any,
    listOptions: any,
    onChangeListBoxHandler: any,
}

export const ListBoxZero: FC<Props> = ({ label, listButton, listOptions, state, onChangeListBoxHandler, width = 'w-full' }) => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const randomId = generateString(7)

    useEffect(() => {
        width = document.getElementById(randomId).offsetWidth;
    }, [randomId, width]);

    return (
        <Listbox value={state} onChange={event => onChangeListBoxHandler(event)}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block w-full text-sm text-gray-500">{label}</Listbox.Label>

                    <div className="mt-1 relative">
                        <Listbox.Button id={randomId} className="relative w-full _lsBnQY bg-white border border-gray-300 rounded-md shadow-sm p-1-5 pl-3 pr-8 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            {listButton}
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div
                                className={
                                    classNames(
                                        width, 'fixed max-h-36 z-50 rounded shadow'
                                    )
                                }>
                                <Listbox.Options style={{ width: width}} className="fixed z-10 mt-1 bg-white shadow-lg max-h-36 w-full rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {listOptions}
                                </Listbox.Options>
                            </div>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}