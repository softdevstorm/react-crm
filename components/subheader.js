import React from "react";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { Button } from 'react-bootstrap';
import { FilterByWeek, FilterByDate } from './filter';

const SubHeader = (props) => {
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');
    const {companyId, company, dispatch} = props;
    
    React.useEffect(() => {
        
    }, [company])

    const compareCompanies = () => {
        console.log('compare');
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
                            <div className="compare-text compare">VS</div>
                            <div className="compare-btn-container">
                                <Button variant="success" onClick={() => compareCompanies()}>Compare</Button>{' '}
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
