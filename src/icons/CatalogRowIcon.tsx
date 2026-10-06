import React from 'react';

type CatalogListIconProps = {
    selected?: boolean;
};

const CatalogRowIcon: React.FC<CatalogListIconProps> = ({ selected = false }) => {

    const primaryColor = selected ? 'hsl(var(--brand))' : 'white'
    const secondaryColor = !selected ? 'hsl(var(--brand))' : 'white'

    return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="41.7391" height="41.7391" rx="16" fill={primaryColor}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M8.22301 10.9241L33.2569 10.9333L33.2578 8.48634L8.22395 8.47715L8.22301 10.9241ZM8.22012 18.4532L33.254 18.4624L33.2549 16.0154L8.22106 16.0063L8.22012 18.4532ZM33.2511 25.9915L8.21723 25.9823L8.21817 23.5354L33.252 23.5446L33.2511 25.9915ZM8.21433 33.5114L33.2482 33.5206L33.2491 31.0737L8.21527 31.0645L8.21433 33.5114Z" fill={secondaryColor}/>
        </svg>
    );
};

export default CatalogRowIcon;
