import React from 'react';

interface CartIconProps {
    cart?: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ cart = false }) => {
    const color = !cart ? "hsl(var(--brand))" : "#FFFFFF";

    return (
        <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.16663 1.49991L2.56577 1.77974C3.7151 2.0096 4.5796 2.963 4.69623 4.12928L4.89996 6.16658M4.89996 6.16658L6.21809 17.151C6.37892 18.4912 7.51589 19.4999 8.86576 19.4999H20.8563C22.9977 19.4999 24.8643 18.0425 25.3837 15.9651L26.8807 9.97702C27.3646 8.0415 25.9007 6.16658 23.9056 6.16658H4.89996Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M15.8332 15.4999H10.4999" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9.83325" cy="24.1666" r="2" fill={color}/>
            <circle cx="21.8333" cy="24.1666" r="2" fill={color}/>
        </svg>

    );
};

export default CartIcon;
