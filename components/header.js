import React, { useState } from 'react';
import Link from 'next/link';
import { DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import OpenMessageModal from './messageModal';
import { logOut, getProfile } from '../lib/auth';
import { getAccountChannel } from '../lib/api';

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

    const [accountChannle, setAccountChannel] = useState([]);
    const [clickedChannelName, setClickedChannelName] = useState(false);
    const [showModal, setShowModal] = useState(false);

    React.useEffect(() => {
        const channel = localStorage.getItem('accountChannel');
        if (channel) {
            setAccountChannel(JSON.parse(channel));
        } else {
            const accountId = getProfile().id;
            getAccountChannel(accountId)
            .then(res => {
                console.log(res)
                localStorage.setItem('accountChannel', JSON.stringify(res.data));
                setAccountChannel(res.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [])

    const showPermissionModal = (e) => {
        const channelName = e.target.text;
        setClickedChannelName(channelName);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

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
                                        accountChannle[item.name]? (
                                            <Dropdown.Item href={accountChannle[item.name].link} key={item.name}>{item.title}</Dropdown.Item>                                            
                                        ) : (
                                            <Dropdown.Item href="#" key={item.name} className="denied-permission" onClick={(e) => showPermissionModal(e)}>{item.title}</Dropdown.Item>
                                        )
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
                <Modal show={showModal} size="lg" onHide={closeModal}>
                    <Modal.Header className="permission-modal" closeButton>
                        <Modal.Title>Permission Denied</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You currently do not have permission to enter the channel page {clickedChannelName}. For accessing it, please get in touch.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </nav>
            <OpenMessageModal></OpenMessageModal>
        </React.Fragment>
    );
  };
  
  export default Header;
  