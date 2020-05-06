import React, { useState } from "react";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { Modal, Tab, Col, Row, Nav, Tabs, Form, ListGroup, Button } from 'react-bootstrap';
import { FilterByWeek, FilterByDate } from './filter';
import { getProfile } from '../lib/auth';
import { getCompanies, getCustomerGroups, getCompareMessagesByWeek, getCompareMessagesByDateRange } from '../lib/api';
import { setCompareData, setCompareCompanyIds } from '../lib/store/action/filter';

const SubHeader = (props) => {
    const {companyId, customerGroupId, company, week, year, startDate, endDate, compareData, compareCompanyIds, dispatch} = props;
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');
    const [showModal, setShowModal] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [compareCompanies, setcompareCompanies] = useState([]);
    const [selectCompany, setSelectCompany] = useState(false);
    const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
    const [selectedCompareCompany, setSelectedCompareCompany] = useState(null);
    
    React.useEffect(() => {
        if (compareData) {
            dispatch(setCompareData(null));
            dispatch(setCompareCompanyIds(null));
        }
    }, [companyId, customerGroupId, week, year, startDate, endDate])

    const opencompareCompaniesModal = () => {
        setShowModal(true);
        let accountCompanies = localStorage.getItem('accountCompanies');
        setCompanies(JSON.parse(accountCompanies));
        setSelectedCompanyIds([]);
    }

    const addCompareCompany = () => {
        const tempCom = companies.filter(company => !selectedCompanyIds.includes(company.id) && company.id != 0 && company.id != companyId);
        setcompareCompanies(tempCom);
        setSelectCompany(true);
    }

    const selecteCompareCompany = (compareCid)  => {
        if (parseInt(compareCid))
        setSelectedCompareCompany(parseInt(compareCid));
    }

    const setSelectedCompareCompanyId = () => {
        if (selectedCompareCompany) {
            if (selectedCompanyIds.length >= 5) {
                alert('Limit is over');
                setSelectCompany(false);
                return false;
            }
            let tempIdListOfSelectedCompareCompanies = [...selectedCompanyIds];
            tempIdListOfSelectedCompareCompanies.push(selectedCompareCompany);
            setSelectedCompanyIds(tempIdListOfSelectedCompareCompanies)
            setSelectedCompareCompany(null);
            setSelectCompany(false);
        }
    }

    const compareCompanyData = () => {
        dispatch(setCompareData(null));
        dispatch(setCompareCompanyIds(null));
        let apiData = [...selectedCompanyIds];
        apiData.unshift(companyId);
        const accountId = getProfile().id;

        if (week && year) {
            getCompareMessagesByWeek(accountId, apiData, customerGroupId, week, year)
            .then(data => {
                data = JSON.parse(data)
                if (data.status === 'success') {
                    dispatch(setCompareData(data.data.data));
                    dispatch(setCompareCompanyIds(apiData));
                    hideModal();
                } else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.log(error);
            })
        } else if (startDate && endDate) {
            if (!customerGroupId) customerGroupId = 0;
            getCompareMessages(accountId, apiData, customerGroupId, startDate, endDate)
            .then(data => {
                data = JSON.parse(data)
                if (data.status === 'success') {
                    dispatch(setCompareData(data.data.data));
                    dispatch(setCompareCompanyIds(apiData));
                    hideModal();
                } else {
                    console.log(data.message);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    const hideModal = () => {
        setShowModal(false);
        setcompareCompanies([]);
        setSelectCompany(false);
        // setSelectedCompanyIds([]);
    }

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
                            {compareCompanyIds? (
                                compareCompanyIds.map(compareCompanyId => (
                                    compareCompanyId !== companyId? (
                                        <React.Fragment key={compareCompanyId}>
                                            <div className="compare-text compare">VS</div>
                                            <div className="compnay-logo compare">
                                                <a href={compareData[compareCompanyId].company.website} target="_blank">
                                                    <img className="logo" src={compareData[compareCompanyId].company.logo} />
                                                </a>
                                            </div>
                                        </React.Fragment>
                                    ) : (null)
                                ))
                            ) : (null)}
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
                        <Col className="col-8">
                            {selectedCompanyIds.map((cid) => {
                                return (
                                    <div className="added-companies" key={cid}>
                                        <div className="company-logo">
                                            {companies.filter(company => company.id === cid)[0].name}
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="add-company-link">
                                <a href="#" onClick={() => addCompareCompany()}>Add New Company to Compare</a>
                            </div>
                        </Col>
                        <Col className="col-4 select-companies">
                            {selectCompany ? (
                                <React.Fragment>
                                    <Form className="select-compare-company">
                                        <Form.Group controlId="compareForm.SelectCustom">
                                            <Form.Control as="select" onChange={(e) => selecteCompareCompany(e.target.value)}>
                                                <option value="0">Select a Company</option>
                                                {compareCompanies.map((company) => {
                                                    return (<option value={company.id} key={company.id}>{company.name}</option>)
                                                })}
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                    <Button variant="success" onClick={() => setSelectedCompareCompanyId()}>Add this company</Button>{' '}
                                </React.Fragment>
                            ) : (null)}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModal}>Cancel</Button>
                    <Button variant="success" onClick={compareCompanyData}>Compare</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        week: state.filter.week,
        year: state.filter.year,
        startDate: state.filter.startDate,
        endDate: state.filter.endDate,
        companyId: state.filter.companyId,
        customerGroupId: state.filter.customerGroupId,
        company: state.filter.company,
        compareData: state.filter.compareData,
        compareCompanyIds: state.filter.compareCompanyIds
    }
}

export default connect(mapStateToProps)(SubHeader);
