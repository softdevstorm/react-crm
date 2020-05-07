import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { getTrafficData } from '../../lib/api';
import { getProfile } from '../../lib/auth';

const Traffic = (props) => {
    const {companyId, startDate, endDate, dispatch} = props;

    React.useEffect(() => {
        const accountId = getProfile().id;
        console.log(startDate);
        console.log(endDate);
        getTrafficData(companyId, startDate, endDate, accountId)
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        })
    }, [companyId, startDate, endDate])

    return ( 
        <Layout title={'Traffic'}>
            <div className="empty"><span>NO DATA TO DISPLAY</span></div>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        companyId: state.filter.companyId,
        startDate: state.filter.startDate,
        endDate: state.filter.endDate
    }
}

export default connect(mapStateToProps)(Traffic);