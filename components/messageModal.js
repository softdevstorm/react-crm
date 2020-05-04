import React, { useState } from 'react';
import { Modal, Tab, Col, Row, Nav, Tabs, Form, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setMessageId } from '../lib/store/action/filter';
import Spinner from 'react-bootstrap/Spinner';
import { getHTMLPreData, getCreatedLists, changeMessageStatus, createNewList } from '../lib/api';
import ConfigUrl from '../config';
import { getProfile } from '../lib/auth';
import { formatDate } from '../lib/utils/date';

const openMessageModal = (props) => {
    const {messageId, dispatch} = props;
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState(null);
    const [htmlContent, setHtmlContent] = useState('');
    const [createdList, setCreatedList] = useState([]);
    const [listName, setListName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [accountId, setAccountId] = useState(0);
    const [error, setError] = useState(false);
    const [errorContent, setErrorContent] = React.useState('')

    React.useEffect(() => {
        if (messageId) {
            const messages = JSON.parse(localStorage.getItem('messages'));
            const modalMessage = messages.filter(message => message.id === messageId)[0];
            const htmlUrl = ConfigUrl.htmlUrl + messageId + '.html';

            getHTMLPreData(htmlUrl)
            .then(data => {
                setHtmlContent(data);
            })
            .catch(error => {
                console.log(error)
            })

            setMessage(modalMessage);
            setShowModal(true);

            const sid = getProfile().id;
            setAccountId(sid);
            getCreatedLists(sid, messageId, 'message')
            .then(data => {
                setCreatedList(JSON.parse(data).data);
            })
            .catch(error => {
                console.log(error)
            })

        }
    }, [messageId])

    const activeMessage = (index) => {
        setIsLoading(true);
        const listId = createdList[index].id;
        changeMessageStatus(messageId, listId, 'active', 'message')
        .then(data => {
            if (data.message == 'success') {
                let tempCreatedList = [...createdList];
                tempCreatedList[index].active = 'true';
                tempCreatedList[index].mail_count += 1;
                setCreatedList(tempCreatedList);
                setIsLoading(false);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const deActiveMessage = (index) => {
        setIsLoading(true);
        const listId = createdList[index].id;
        changeMessageStatus(messageId, listId, 'deactive', 'message')
        .then(data => {
            if (data.message == 'success') {
                let tempCreatedList = [...createdList];
                tempCreatedList[index].active = 'false';
                tempCreatedList[index].mail_count -= 1;
                setCreatedList(tempCreatedList);
                setIsLoading(false);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleListName = (event) => {
        let newListName = event.target.value;
        setListName(newListName);
        setError(false);
    }

    const createList = () => {
        if (listName === undefined || listName === '') {
            setError(true);
            setErrorContent('List Name should not be empty')
        }
        else {
            setIsLoading(true);
            createNewList(accountId, listName)
            .then(data => {
                if (data.status == 'success') {
                    getCreatedLists(accountId, messageId, 'message')
                    .then(res => {
                        setCreatedList(JSON.parse(res).data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                } else {
                    setIsLoading(false);
                    setError(true);
                    setErrorContent('List already exist')
                }
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error)
            })
        }
    }

    const sortList = (event) => {
        const option = event.target.value;
        let tempList = [...createdList]
        if (option === 'name') {
            tempList
            .sort(function(a, b) {
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })
        } else if (option === 'date') {
            tempList
            .sort(function(a, b) {
                return new Date(b.created_at) - new Date(a.created_at);
            })
        }
        setCreatedList(tempList);
    }

    const hideModal = () => {
        setShowModal(false);
        setMessage(null);
        setHtmlContent('');
        setCreatedList([]);
        setListName('');
        setIsLoading(false);
        setError(false);
        setErrorContent('');
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
                                    { isLoading? (
                                        <div className="api-loading">
                                            <Spinner
                                            variant="primary"
                                            as="span"
                                            animation="border"
                                            size="lg"
                                            role="status"
                                            aria-hidden="true"
                                            className="loader"
                                        />
                                        </div> ): (
                                        <React.Fragment>
                                            <div className="form-inline create-list-form mt-5">
                                                <div className="col-8 col">
                                                    <Form.Control 
                                                        className="form-control mr-5 list-name invalid" 
                                                        placeholder="List name"
                                                        defaultValue={listName}
                                                        onChange={(event) => handleListName(event)} />
                                                </div>
                                                <div className="col-4 text-right col">
                                                    <button className="btn btn-sm btn-primary create-btn form-control" onClick={() => createList()}>create</button>
                                                </div>
                                                {error ? (<label className="error mt-2">{errorContent}</label>) : (null)}
                                            </div>
                                            <ul className="mt-3 separate-line"></ul>
                                            <Form className="sort-select">
                                                <Form.Group controlId="sortForm.SelectCustom">
                                                    <Form.Label>SORT</Form.Label>
                                                    <Form.Control as="select" onChange={(e) => sortList(e)}>
                                                        <option value="date">Last edited</option>
                                                        <option value="name">Name</option>
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
                                                            !isLoading? (
                                                                <Form.Check 
                                                                    custom
                                                                    type="checkbox"
                                                                    checked={true}
                                                                    id={`custom-checkbox-${index}`}
                                                                    className="float-right"
                                                                    label=""
                                                                    onChange={() => deActiveMessage(index)}
                                                                />
                                                            ) : ('')
                                                        ) : (
                                                            !isLoading? (
                                                                <Button variant="outline-primary" size="sm" className="float-right" onClick={() => activeMessage(index)}>
                                                                    <span className="fa fa-plus"></span>
                                                                </Button>
                                                            ) : ('')
                                                        )}
                                                    </ListGroup.Item>
                                                )})}
                                            </ListGroup>
                                        </React.Fragment>
                                    )}
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