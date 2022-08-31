import React, { FC } from "react";

interface Props {
    name: any,
    type: any,
    label: any,
    value: any,
    inputError: any,
    onInputBlur: any,
    required: boolean,
    onChangeHandler: any,
    isPostingForm: boolean,
}

export const FloatingLabelInput: FC<Props> = ({name, type, label, value, inputError, onInputBlur, required, onChangeHandler, isPostingForm}) => {
    const classNames = (...classes: any[]) => {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <React.Fragment>
            <div className="w-full text-sm mb-4">
                <div className="relative z-0">
                    {
                        isPostingForm ? (
                            <input
                                disabled
                                required={required ? true : false}
                                type={type}
                                name={name}
                                value={value}
                                placeholder=" "
                                autoComplete="off"
                                onChange={onChangeHandler}
                                className="pt-2 pb-2 block w-full text-slate-700 mt-0 bg-transparent border rounded px-4 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 border-gray-300 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        ) : (
                            <input
                                required={required ? true : false}
                                type={type}
                                name={name}
                                value={value}
                                placeholder=" "
                                autoComplete="off"
                                onBlur={onInputBlur}
                                onChange={onChangeHandler}
                                className={classNames(
                                    inputError.length > 0 ? 'text-red-700 border-red-400' : 'text-slate-700 border-gray-300',
                                    "pt-2 pb-2 block w-full  mt-0 bg-transparent border rounded px-4 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 text-sm"
                                )}
                            />
                        )
                    }

                    <label htmlFor="email" className={classNames(
                        isPostingForm ? 'text-gray-400' : 'text-gray-500',
                        inputError.length ? 'text-red-500' : 'text-gray-500',
                        "absolute duration-300 bg-white top-2 px-2 ml-2 -z-1 origin-0"
                    )}>
                        {label}
                    </label>
                </div>

                {
                    inputError.length > 0 &&
                    <span className='invalid-feedback text-xs block text-red-600 pl-0 py-1'>
                        {inputError}
                    </span>
                }
            </div>
        </React.Fragment>
    )
}