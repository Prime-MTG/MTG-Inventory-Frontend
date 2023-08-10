import React from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex flex-row w-full p-4 justify-between items-center">
            <div className="flex text-2xl text-slate-700">
                <Link to="/"> PrimeMTG </Link>
            </div>
            <div className="flex flex-row text-lg text-slate-700 gap-8 items-center">
                <Link to="/inventory">
                    <p className="flex"> Inventory </p>
                </Link>
                <Link to="/friends">
                    <p className="flex"> Friends </p>
                </Link>
                <Link to="/me">
                    <span className="flex"> <RxAvatar/> </span>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
