import React from 'react';
import { getYear } from '../lib/utils/date'

const Footer = (props) => {
    const currentYear = getYear();
    return (
        <div className="footer copyright"><small>CRM Spy {currentYear}</small></div>
    );
};

export default Footer;
