import React from 'react';
import Link from './Link';

const Header = () => {
    return (
        <div className="ui secondary menu">
            <Link href="/" className="item">Accordion</Link>
            <Link href="/dropdown" className="item">Dropdown</Link>
            <Link href="/search" className="item">WikiSearch</Link>
            <Link href="/translate" className="item">Translate</Link>
        </div>
    );
}

export default Header;