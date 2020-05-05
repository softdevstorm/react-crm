import React, { useState } from "react";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { Modal, Tab, Col, Row, Nav, Tabs, Form, ListGroup, Button } from 'react-bootstrap';
import { FilterByWeek, FilterByDate } from './filter';
import { getProfile } from '../lib/auth';
import { getCompanies, getCustomerGroups } from '../lib/api';

const SubHeader = (props) => {
    const {companyId, company, dispatch} = props;
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');
    const [showModal, setShowModal] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [compareCompanies, setcompareCompanies] = useState([]);
    const [selectCompany, setSelectCompany] = useState(false);
    const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
    
    React.useEffect(() => {
        // let tempIdsOfSelectedCompanies = [...selectedCompanyIds];
        // tempIdsOfSelectedCompanies.push(companyId);
        // setSelectedCompanyIds(tempIdsOfSelectedCompanies);
    }, [companyId])

    const opencompareCompaniesModal = () => {
        setShowModal(true);
        let tempIdsOfSelectedCompanies = [];
        tempIdsOfSelectedCompanies.push(companyId);
        setSelectedCompanyIds(tempIdsOfSelectedCompanies);
        const accountId = getProfile().id;
        getCompanies(accountId)
        .then(data => {
            setCompanies(data.data.companies);
        }).catch(error => {
            console.log(error)
        })
    }

    const addCompareCompany = () => {
        const tempCom = companies.filter(company => !selectedCompanyIds.includes(company.id) && company.id != 0);
        setcompareCompanies(tempCom);
        setSelectCompany(true);
    }

    const hideModal = () => {
        setShowModal(false);
        setSelectedCompanyIds([]);
        setcompareCompanies([]);
        setSelectCompany(false);
        let tempIdsOfSelectedCompanies = [];
        tempIdsOfSelectedCompanies.push(companyId);
        setSelectedCompanyIds(tempIdsOfSelectedCompanies);
    }

    console.log(selectedCompanyIds);
    console.log(compareCompanies);

    return (
        <div className="row sub-top-bar">
            <div className="col-md-6">
                <div className="company-logo-container">
                    {company? (
                        <React.Fragment>
                            <div className="compnay-logo compare">
                                <a href={company.website} target="_blank">
                                    <img className="logo" src={company.logo} />
                                </a>
                            </div>
                            <div className="compare-text compare">VS</div>
                            <div className="compare-btn-container">
                                <Button variant="success" onClick={() => opencompareCompaniesModal()}>Compare</Button>{' '}
                            </div>
                        </React.Fragment>
                    ) : (null)}
                </div>
            </div>
            <div className="col-md-6">
                <div className="filter">
                    {pathName.includes('overview') ? (
                        <FilterByWeek />
                    ) : (
                        <FilterByDate />
                    )}
                </div>
            </div>

            <Modal
                className="compare-modal"
                show={showModal}
                onHide={hideModal}
                size="lg"
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Add Companies
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="col-9">
                            {compareCompanies.map((company) => {
                                <div className="added-companies">
                                    <div className="company-logo">
                                        <a href={company.website}><img src={company.logo} />
                                        </a>
                                    </div>
                                    <div className="company-name">{company.name}</div>
                                </div>
                            })}
                            <div className="add-company-link">
                                <a href="#" onClick={() => addCompareCompany()}>Add New Company to Compare</a>
                            </div>
                        </Col>
                        <Col className="col-3">
                            {selectCompany ? (
                                <Form className="select-compare-company">
                                    <Form.Group controlId="compareForm.SelectCustom">
                                        <Form.Control as="select">
                                            {compareCompanies.map((company) => {
                                                return (<option value={company.id} key={company.id}>{company.name}</option>)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            ) : (null)}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        companyId: state.filter.companyId,
        company: state.filter.company
    }
}

export default connect(mapStateToProps)(SubHeader);
