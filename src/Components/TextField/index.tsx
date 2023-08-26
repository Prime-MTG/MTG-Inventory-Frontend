import React from 'react';

interface Props {
    title: string,
    shielded?: boolean,
    required?: boolean,
    setValue: React.Dispatch<React.SetStateAction<string>>, // state setting method
    error?: string,
    maxLength?: number
}

const TextField = ({title, shielded = false, required = false, setValue, error, maxLength}: Props) => {
    return (
        <div className='flex flex-col w-full items-start'>
            <div className='flex flex-row'>
                <p className='flex pb-2 text-md text-slate-900'>{title}</p>
                {required && (
                    <p className='flex text-md text-red-700'>*</p>
                )}
            </div>
            <input
                className='w-full rounded-sm border-2 border-solid boder-slate-700'
                type={shielded ? 'password' : 'text'}
                maxLength={maxLength}
                onChange={evt => setValue(evt.target.value)}
            />
            {error && (
                <p className='flex pt-2 text-sm text-red-700'>{error}</p>
            )}
        </div>
    );
};

export default TextField;
