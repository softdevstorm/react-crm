import React, { useState } from 'react';
import Link from 'next/link';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import OpenMessageModal from './messageModal';
import { logOut } from '../lib/auth';

const Header = () => {

    const competitionDropDownList = [
        {
            name: 'Mail',
            title: 'Mail'
        }, {
            name: 'Print',
            title: 'Print'
        }, {
            name: 'App Push',
            title: 'App-Push'
        }, {
            name: 'Kassenzettel',
            title: 'Checkout-Coupon'
        }, {
            name: 'Facebook Ads',
            title: 'Facebook Ads'
        }, {
            name: 'Messenger',
            title: 'Messenger'
        }, {
            name: 'WhatsApp',
            title: 'WhatsApp'
        }
    ]

    const reportDropDownList = [
        {
            name: 'List',
            link: 'lists'
        }, {
            name: 'Reports',
            title: 'reports'
        }
    ]

    return (
        <React.Fragment>
            <nav className="row top-header">
                <div className="col col-md-12">
                    <div className="main-logo col-md-1 ml-2">
                        <a href="/">
                            <img src="/images/logo-sm.png"/>
                        </a>
                    </div>
                    <div className="navbar navbar-expand-sm col-md-8">
                        <ul className="navbar-nav ml-4">
                            <li className="nav-item">
                                <DropdownButton id="dropdown-basic-button" title="Competition">
                                    {competitionDropDownList.map(item => (
                                        <Dropdown.Item href="#" key={item.name}>{item.title}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </li>
                            <li className="nav-item nav-item-industry">
                                <a className="dropdown-item-industry" data-name="Industry" href="#">Industry</a>
                            </li>
                            <li className="nav-item">
                                <DropdownButton id="dropdown-basic-button" title="Report">
                                    {reportDropDownList.map(item => (
                                        <Dropdown.Item href={`/user/${item.link}`} key={item.name}>{item.name}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <a href="#" onClick={(event)=>logOut(event)} className="logout float-right">
                            <i className="fa fa-sign-out fa-lg"></i>
                        </a>
                        <a href="/user/account" className="nav-profile-link float-right mr-3"><img src="/images/user-icon.png" /></a>
                    </div>
                </div>
            </nav>
            <OpenMessageModal></OpenMessageModal>
        </React.Fragment>
    );
  };
  
  export default Header;
  