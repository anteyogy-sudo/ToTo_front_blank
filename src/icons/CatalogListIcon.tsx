import React from 'react';

type CatalogListIconProps = {
    selected?: boolean;
};

const CatalogListIcon: React.FC<CatalogListIconProps> = ({ selected = false }) => {

    const primaryColor = selected ? '#005CA7' : '#F8F6F7'
    const secondaryColor = !selected ? '#005CA7' : '#F8F6F7'

    return (
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="41.7391" height="41.7391" rx="16" fill={primaryColor}/>
            <rect x="8.4375" y="8.47852" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="23.1875" y="8.47852" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="8.4375" y="16.0801" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="23.1875" y="16.0801" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="8.4375" y="23.6855" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="23.1875" y="23.6855" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="8.4375" y="31.2871" width="10.2863" height="2.23615" fill={secondaryColor}/>
            <rect x="23.1875" y="31.2871" width="10.2863" height="2.23615" fill={secondaryColor}    />
        </svg>

    );
};

export default CatalogListIcon;
