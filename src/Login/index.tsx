import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '../Components/TextField';
import Button from '../Components/Button';

const emptyUNError = 'Please enter a username';
const emptyPWError = 'Please enter a password';

const Login = () => {
    const [startingState, setStartingState] = useState<{un: boolean, pw: boolean}>({un: true, pw: true});
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<undefined | string>();
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<undefined | string>();
    const [showFailure, setShowFailure] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (username.length > 0) {
            if (startingState.un) {
                setStartingState({...startingState, un: false});
            }
            setUsernameError(undefined);
        }
        if (password.length > 0) {
            if (startingState.pw) {
                setStartingState({...startingState, pw: false});
            }
            setPasswordError(undefined);
        }

        if (username.length === 0 && !startingState.un) {
            setUsernameError(emptyUNError);
        }
        if (password.length === 0 && !startingState.pw) {
            setPasswordError(emptyPWError);
        }
    }, [username, password, startingState]);

    return (
        <div className='flex w-screen h-screen bg-slate-400 text-slate-700'>
            <div className='flex flex-col justify-center m-auto w-1/6 p-8 gap-4 rounded-lg bg-white'>
                <p className='flex text-4xl'>Log In</p>
                <TextField
                    title='Username'
                    required={true}
                    setValue={setUsername}
                    maxLength={16}
                    error={usernameError}
                />
                <TextField
                    title='Password'
                    shielded={true}
                    required={true}
                    setValue={setPassword}
                    error={passwordError}
                />
                <Button
                    className='m-auto'
                    text='Continue'
                    onClick={() => {
                        if (username.length === 0) {
                            setUsernameError(emptyUNError);
                        }
                        if (password.length === 0) {
                            setPasswordError(emptyPWError);
                        }
                        if (username.length > 0 && password.length > 0) {
                            const valid = true; // later this should check with the database, and enable a disabled loading state on the button while async
                            if (valid) {
                                navigate('/');
                            } else {
                                setShowFailure(true);
                            }
                        }
                    }}
                />
                {showFailure && (
                    <p className='flex text-md m-auto text-red-700'>
                        Username and password not verified, please try again
                    </p>
                )}
                <p className='flex text-md m-auto'>
                    Don't have an account?&nbsp;
                    <Link to='/signup' className='text-blue-700'>
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
