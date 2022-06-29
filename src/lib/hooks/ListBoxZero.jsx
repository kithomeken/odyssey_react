/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'

export default function ListBoxZero({label, listButton, listOptions, state, onChangeListBoxHandler}) {
    return (
        <Listbox value={state} onChange={event => onChangeListBoxHandler(event)}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm text-gray-500">{label}</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            {listButton}
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-44 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {listOptions}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
