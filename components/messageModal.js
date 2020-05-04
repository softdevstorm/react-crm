import React, { useState } from 'react';
import { Modal, Tab, Col, Row, Nav, Tabs, Form, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setMessageId } from '../lib/store/action/filter';
import { getHTMLPreData, getCreatedLists, changeMessageStatus } from '../lib/api'
import ConfigUrl from '../config';
import { getProfile } from '../lib/auth';
import { formatDate } from '../lib/utils/date';

const openMessageModal = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [htmlContent, setHtmlContent] = useState('');
    const {messageId, dispatch} = props;
    const [createdList, setCreatedList] = useState([])

    React.useEffect(() => {
        if (messageId) {
            const messages = JSON.parse(localStorage.getItem('messages'));
            const modalMessage = messages.filter(message => message.id === messageId)[0];
            const htmlUrl = ConfigUrl.htmlUrl + messageId + '.html' ;

            getHTMLPreData(htmlUrl)
            .then(data => {
                setHtmlContent(data);
            })
            .catch(error => {
                console.log(error)
            })

            setMessage(modalMessage);
            setShowModal(true);

            const accountId = getProfile().id;
            const listUrl = `${ConfigUrl.apiUrl}/accounts/${accountId}/list?data_id=${messageId}&type=message`

            getCreatedLists(listUrl)
            .then(data => {
                setCreatedList(JSON.parse(data).data);
            })
            .catch(error => {
                console.log(error)
            })

        }
    }, [messageId])

    React.useEffect(() => {
        if (messageId) {
            const messages = JSON.parse(localStorage.getItem('messages'));
            const modalMessage = messages.filter(message => message.id === messageId)[0];
            const htmlUrl = ConfigUrl.htmlUrl + messageId + '.html' ;

            getHTMLPreData(htmlUrl)
            .then(data => {
                setHtmlContent(data);
            })
            .catch(error => {
                console.log(error)
            })

            setMessage(modalMessage);
            setShowModal(true);

            const accountId = getProfile().id;
            const listUrl = `${ConfigUrl.apiUrl}/accounts/${accountId}/list?data_id=${messageId}&type=message`

            getCreatedLists(listUrl)
            .then(data => {
                setCreatedList(JSON.parse(data).data);
            })
            .catch(error => {
                console.log(error)
            })

        }
    }, [])

    const activeMessage = (index) => {
        const listId = createdList[index].id;
        changeMessageStatus(messageId, listId, 'active', 'message')
        .then(data => {
            if (data.message == 'success') {
                let tempCreatedList = [...createdList];
                tempCreatedList[index].active = 'true';
                tempCreatedList[index].mail_count += 1;
                setCreatedList(tempCreatedList);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const deActiveMessage = (index) => {
        const listId = createdList[index].id;
        changeMessageStatus(messageId, listId, 'deactive', 'message')
        .then(data => {
            if (data.message == 'success') {
                let tempCreatedList = [...createdList];
                tempCreatedList[index].active = 'false';
                tempCreatedList[index].mail_count -= 1;
                setCreatedList(tempCreatedList);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const hideModal = () => {
        setShowModal(false);
        setMessage(null);
        dispatch(setMessageId(null));
    }

    return (
        <>
            <Modal
                className="message-modal"
                show={showModal}
                onHide={hideModal}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        <a className="download-btn" href="" title="Download"><i className="fa fa-download pr-2"></i>IMAGE</a>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={8}>
                            <Tab.Container id="message-tab" defaultActiveKey="desktop-tab">
                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="desktop-tab"><i className="fa fa-desktop">&emsp;Desktop</i></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="mobile-tab"><i className="fa fa-phone-laptop">&emsp;Mobile</i></Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="source-tab"><i className="fa fa-code">&emsp;Source</i></Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="desktop-tab">
                                        <div className="tab-detail-content image-tab">
                                            <img id="modal-desktop-image" src={message? ConfigUrl.assetsUrl + messageId + "--x720p.png" : ""} />
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="mobile-tab">
                                        <div className="tab-detail-content image-tab">
                                            <img id="modal-mobile-image" src={message? ConfigUrl.assetsUrl + messageId + "--x480p.png" : ""}  />
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="source-tab">
                                        <div className="tab-detail-content">
                                            <pre className="modal-source-html">{htmlContent}</pre>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Col>
                        <Col sm={4} className="message-detail">
                            <Tabs defaultActiveKey="message-detail" id="detail-tab">
                                <Tab eventKey="message-detail" title="DETAILS">
                                    <img className="modal-company-logo" src={message? message.logo : ''} />
                                    <span className="modal-company-name pb-2">{message? message.company: ''}</span>
                                    <br></br>
                                    <br></br>
                                    <b>Datetime</b>
                                    <div className="modal-datetime pb-2">{message? message.received_on: ''}</div>
                                    <b>Department</b>
                                    <div className="modal-sender pb-2">{message? message.sender: ''}</div>
                                    <b>Customer Group</b>
                                    <div className="modal-customer-segment pb-2">{message && message.customer_group? message.customer_group: '-'}</div>
                                    <b>Promotions</b>
                                    <div className="modal-promotion pb-2">{message && message.special1? message.special1: '-'}</div>
                                    <b>Specials</b>
                                    <div className="modal-specials pb-2">{message && message.special2? message.special2.join(', '): '-'}</div>
                                    <b>Subject</b>
                                    <div className="modal-subject pb-2">{message? message.subject: ''}</div>
                                </Tab>
                                <Tab eventKey="add-to-list" title="ADD TO LIST">
                                    <div className="form-inline create-list-form mt-5">
                                        <div className="col-8 col">
                                            <input className="form-control mr-5 list-name invalid" placeholder="List name" />
                                        </div>
                                        <div className="col-4 text-right col">
                                            <button className="btn btn-sm btn-primary create-btn form-control">create</button>
                                        </div>
                                    </div>
                                    <ul className="mt-3 separate-line"></ul>
                                    <Form className="sort-select">
                                        <Form.Group controlId="sortForm.SelectCustom">
                                            <Form.Label>SORT</Form.Label>
                                            <Form.Control as="select">
                                                <option>Last edited</option>
                                                <option>Name</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    <ListGroup>
                                        {createdList.map((list, index) => {
                                            return (
                                            <ListGroup.Item key={list.id}>
                                                <div className="float-left data-list-name">
                                                    <p className="font-weight-bold mb-0 data-name">{list.name}</p>
                                                    <p className="mb-0 email-count">{list.mail_count > 1 ? `${list.mail_count} Touchpoints`: `${list.mail_count} Touchpoint`} </p>
                                                </div>
                                                <div className="float-left ml-3 list-created-date hide">
                                                    <p className="font-weight-bold">{formatDate(list.created_at)}</p>
                                                </div>
                                                {list.active == 'true'? (
                                                    <Form.Check 
                                                        custom
                                                        type="checkbox"
                                                        checked={true}
                                                        id={`custom-checkbox-${index}`}
                                                        className="float-right"
                                                        label=""
                                                        onChange={() => deActiveMessage(index)}
                                                    />
                                                ) : (
                                                    <Button variant="outline-primary" size="sm" className="float-right" onClick={() => activeMessage(index)}>
                                                        <span className="fa fa-plus"></span>
                                                    </Button>
                                                )}
                                            </ListGroup.Item>
                                        )})}
                                    </ListGroup>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        messageId: state.filter.messageId
    }
}

export default connect(mapStateToProps)(openMessageModal)