import React, { useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Dropdown from '../Components/Dropdown';

const Navbar = () => {
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='flex flex-row w-full p-4 border-b-2 border-slate-700 justify-between items-center'>
            <div className='flex text-2xl text-slate-700'>
                <Link to='/'> PrimeMTG </Link>
            </div>
            <div className='flex flex-row text-lg text-slate-700 gap-8 items-center'>
                <Link to='/inventory'>
                    <p className='flex'> Inventory </p>
                </Link>
                <Link to='/friends'>
                    <p className='flex'> Friends </p>
                </Link>
                {!!window.localStorage.getItem('primeMTGLogin') &&
                    <Dropdown
                        trigger={
                            <span className='h-9 w-9 items-center justify-center'>
                                <RxAvatar className='h-full w-full' />
                            </span>
                        }
                        members={[
                            (<Link to='/me'>
                                My Account
                            </Link>),
                            (<span
                                className='cursor-pointer'
                                onClick={() => {
                                    window.localStorage.removeItem('primeMTGLogin');
                                    navigate('/');
                                }}
                            >
                                Log Out
                            </span>)
                        ]}
                    />
                }
                {!window.localStorage.getItem('primeMTGLogin') &&
                    <Button
                        text={'Log In'}
                        onClick={() => { navigate('/login') }}
                    />
                }
            </div>
        </div>
    );
};

export default Navbar;
