import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '../Components/TextField';
import Button from '../Components/Button';

const emptyEMError = 'Please enter an email';
const invalidEMError = 'Invalid email, please enter one matching the format example@domain.com'
const emptyUNError = 'Please enter a username';
const emptyPWError = 'Please enter a password';
const invalidPWError = 'Invalid password, please refer to the password guidelines above and construct a stronger one';
const emptyCPWError = 'Please confirm your password';
const unmatchedCPWError = 'Passwords do not match';

const Signup = () => {
    const [startingState, setStartingState] = useState<{
        em: boolean,
        un: boolean,
        pw: boolean,
        cpw: boolean
    }>({em: true, un: true, pw: true, cpw: true});
    const [email, setEmail] = useState<string>('');
    const [emailChanged, setEmailChanged] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<undefined | string>();
    const [username, setUsername] = useState<string>('');
    const [usernameChanged, setUsernameChanged] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<undefined | string>();
    const [password, setPassword] = useState<string>('');
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<undefined | string>();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordChanged, setConfirmPasswordChanged] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<undefined | string>();
    const [showFailure, setShowFailure] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const listener = (evt: KeyboardEvent) => {
            if (evt.code === 'Enter') { // if enter is pressed, find the continue button element and click it
                const button = document.getElementById('continue-button');
                button?.click();
            }
        };
        window.addEventListener('keypress', listener);
        // the function you tell useEffect to return is executed only when this element unloads, so leaving the signup page will remove the event listener
        return () => window.removeEventListener('keypress', listener);
    }, []); // empty dependency array means it'll only run once when the page first loads

    // check if fields have been changed from empty to not, or vice versa
    // if so, apply necessary validation error (if they already filled it in but now it's blank)
    useEffect(() => {
        if (email.length > 0 && emailChanged) {
            if (startingState.em) {
                setStartingState({...startingState, em: false});
            }
            setEmailError(undefined);
            setEmailChanged(false);
        }
        if (username.length > 0 && usernameChanged) {
            if (startingState.un) {
                setStartingState({...startingState, un: false});
            }
            setUsernameError(undefined);
            setUsernameChanged(false);
        }
        if (password.length > 0 && passwordChanged) {
            if (startingState.pw) {
                setStartingState({...startingState, pw: false});
            }
            setPasswordError(undefined);
            setPasswordChanged(false);
        }
        if (confirmPassword.length > 0 && confirmPasswordChanged) {
            if (startingState.cpw) {
                setStartingState({...startingState, cpw: false});
            }
            setConfirmPasswordError(undefined);
            setConfirmPasswordChanged(false);
        }

        if (email.length === 0 && !startingState.em) {
            setEmailError(emptyEMError);
        }
        if (username.length === 0 && !startingState.un) {
            setUsernameError(emptyUNError);
        }
        if (password.length === 0 && !startingState.pw) {
            setPasswordError(emptyPWError);
        }
        if (confirmPassword.length === 0 && !startingState.cpw) {
            setConfirmPasswordError(emptyCPWError);
        }
    }, [email, emailChanged, username, usernameChanged, password, passwordChanged, confirmPassword, confirmPasswordChanged, startingState]);

    const emailVerificationRegex = new RegExp(/[a-zA-Z0-9+]+@[a-zA-Z0-9]+\.[a-zA-Z]+/);
    const passwordVerificationRegex = new RegExp(/(?=.*[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]+.*)(?=.*[A-Z]+.*)(?=.*[a-z]+.*)(?=.*[0-9]+.*)(?=.+.+.+.+.+.+.+.+)/);

    return (
        <div className='flex w-screen h-screen bg-slate-400 text-slate-700'>
            <div className='flex flex-col justify-center m-auto w-1/6 p-8 gap-4 rounded-lg bg-white'>
                <p className='flex text-4xl'>Sign Up</p>
                <TextField
                    title='Email'
                    required={true}
                    setValue={(val) => {
                        setEmail(val);
                        setEmailChanged(true);
                    }}
                    error={emailError}
                />
                <TextField
                    title='Username'
                    shielded={false}
                    required={true}
                    setValue={(val) => {
                        setUsername(val);
                        setUsernameChanged(true);
                    }}
                    maxLength={16}
                    error={usernameError}
                />
                <div className='flex flex-col text-md'>
                    Password guidelines:
                    <ol className='ml-4'>
                        <li>
                            • 8 or more characters
                        </li>
                        <li>
                            • At least one uppercase letter
                        </li>
                        <li>
                            • At least one lowercase letter
                        </li>
                        <li>
                            • At least one number
                        </li>
                        <li>
                            • At least one special character from among the following:
                            <br />
                            &nbsp;&nbsp;&nbsp;{'!@#$%^&*()`~-_=+[]{}\\|;:\'",.<>/?'}
                        </li>
                    </ol>
                </div>
                <TextField
                    title='Password'
                    shielded={true}
                    required={true}
                    setValue={(val) => {
                        setPassword(val);
                        setPasswordChanged(true);
                    }}
                    error={passwordError}
                />
                <TextField
                    title='Confirm Password'
                    shielded={true}
                    required={true}
                    setValue={(val) => {
                        setConfirmPassword(val);
                        setConfirmPasswordChanged(true);
                    }}
                    error={confirmPasswordError}
                />
                <Button
                    id='continue-button'
                    className='m-auto'
                    text='Continue'
                    onClick={() => {
                        const isValidEmail = emailVerificationRegex.test(email);
                        const isValidPassword = passwordVerificationRegex.test(password);
                        
                        setShowFailure(false);

                        if (!isValidEmail) {
                            setEmailError(invalidEMError);
                            setEmailChanged(false);
                        }
                        if (!isValidPassword) {
                            setPasswordError(invalidPWError);
                            setPasswordChanged(false);
                        }
                        if (password !== confirmPassword) {
                            setConfirmPasswordError(unmatchedCPWError);
                            setConfirmPasswordChanged(false);
                        }

                        // empty fields should be addressed first, so these error override any already assessed ones
                        if (email.length === 0) {
                            setEmailError(emptyEMError);
                            setEmailChanged(false);
                        }
                        if (username.length === 0) {
                            setUsernameError(emptyUNError);
                            setUsernameChanged(false);
                        }
                        if (password.length === 0) {
                            setPasswordError(emptyPWError);
                            setPasswordChanged(false);
                        }
                        if (confirmPassword.length === 0) {
                            setConfirmPasswordError(emptyCPWError);
                            setConfirmPasswordChanged(false);
                        }

                        if (isValidEmail && username.length > 0 && isValidPassword && password === confirmPassword) {
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
                        Account not created, please try again
                    </p>
                )}
                <p className='flex text-md m-auto'>
                    Already have an account?&nbsp;
                    <Link to='/login' className='text-blue-700'>
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
