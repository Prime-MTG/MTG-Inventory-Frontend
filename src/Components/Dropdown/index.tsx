import React, { ReactNode, useEffect, useState } from 'react';

interface Props {
    trigger: ReactNode,
    members: ReactNode[] 
};

const Dropdown = ({ trigger, members }: Props) => {
    const [open, setOpen] = useState(false);
    const [menuId] = useState(`dropdown-${Math.floor(Math.random() * 100000)}`);

    useEffect(() => {
        const listener = (evt: MouseEvent) => {
            const target = evt.target as any; // for some reason react's version of a MouseEvent doesn't have the target's html information??
            const parent = target?.parentElement;
            const grandparent = parent?.parentElement; // lol
            // for real though, we want this to trigger if they click the div, the svg tag, or the path tag that draws the svg

            if (
                ((target?.id === menuId || parent?.id === menuId || grandparent?.id === menuId) && open) ||
                    (target?.id !== menuId && parent?.id !== menuId && grandparent?.id !== menuId)
            ) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };
        window.addEventListener('click', listener);
        // the function you tell useEffect to return is executed only when this element unloads, so leaving the login page will remove the event listener
        return () => window.removeEventListener('click', listener);
    }, [open, menuId]); // empty dependency array means it'll only run once when the page first loads

    return (
        <div className='flex'>
            <div id={menuId} className='flex cursor-pointer'>
                {trigger}
            </div>
            {open &&
                <ul
                    className='absolute flex-col list-none m-0 mt-8 ml-[-80px] p-0 rounded-md gap-2 bg-slate-300' // these exact pixel measurements aren't great practice for a generalized component but i just want it to work for now
                >
                    {members.map((el, ind) => (
                        <span>
                            <li id={ind.toString()} className='py-1 px-2'>
                                {el}
                            </li>
                            {ind !== members.length - 1 &&
                                <div className='mx-2 h-0 border border-t-1 border-slate-700'/>
                            }
                        </span>
                    ))}
                </ul>
            }
        </div>
    );
};

export default Dropdown;