import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { getData } from '../../lib/api';
import { getProfile } from '../../lib/auth';
import WeekChart from '../../lib/charts/weekbarchart';
import DayWeekChart from '../../lib/charts/day-week-chart';
import DayWeekCompareChart from '../../lib/charts/day-week-compare-chart';
import CategoryChart from '../../lib/charts/category-chart';
import PromotionChart from '../../lib/charts/promotion-chart';
import SlickSliderWithImage from '../../lib/utils/slick-slider';
import { setCompany } from '../../lib/store/action/filter';

const OverView = (props) => {
    const {companyId, customerGroupId, week, year, compareData, compareCompanyIds, dispatch} = props;
    const [selectedcompany, setSelectedCompany] = React.useState(null);
    const [sid, setSid] = React.useState(0);
    const [dataAvailable, setDataAvailable] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [totalCount, setTotalCount] = React.useState('');
    const [compareMessages, setCompareMessages] = React.useState([]);
    const [companyIds, setCompanyIds] = React.useState([]);

    React.useEffect(() => {
        const id = getProfile().id;
        setSid(id);
    }, [])

    React.useEffect(() => {
        setCompanyIds([]);
    }, [messages])

    React.useEffect(() => {
        const id = getProfile().id;
        setSid(id);
        if ((companyId || companyId === 0) && (customerGroupId || customerGroupId === 0) && week && year) {
            getData(companyId, customerGroupId, week, year, id)
            .then(data => {
                setSelectedCompany(data.data.company);
                dispatch(setCompany(data.data.company));
                setTotalCount(data.data.count);
                setStartDate(data.data.start_date);
                setEndDate(data.data.end_date);
                let resMessages = data.data.messages;
                setMessages(resMessages)
                if (resMessages.length > 0) {
                    localStorage.setItem('messages', JSON.stringify(resMessages));
                    setDataAvailable(true);
                } else {
                    setDataAvailable(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [year, week, companyId, customerGroupId])

    // React.useEffect(() => {
    //     setCompareMessages(compareData);
    // }, [compareData])

    React.useEffect(() => {
        setCompanyIds(compareCompanyIds);
        setCompareMessages(compareData);
    }, [compareCompanyIds])

    return (
        <Layout title={'Overview'}>
            {dataAvailable ? ( 
                <div className="data-content">
                    <div className="weekchart-container">
                        <div className="touchpoint-counts col-3">
                            <div>
                                <span id="t_count">{totalCount}</span>
                                <br />
                                <span className="text">TOUCHPOINTS</span>
                                <br />
                                <span className="date-range">{`${startDate} - ${endDate}`}</span>
                            </div>
                        </div>
                        <div className="week-chart col-9">
                            <WeekChart messages={messages} compareMessages={compareMessages} companyIds={companyIds}/>
                        </div>
                    </div>
                    <div className="multi-chart-container">
                        <div className="col-4">
                            <div className="apex-chart">
                                {companyIds.length > 0? (
                                    <DayWeekCompareChart compareMessages={compareMessages} companyIds={companyIds} />
                                ) : (
                                    <DayWeekChart messages={messages} />
                                )}
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="apex-chart">
                                <CategoryChart messages={messages} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="apex-chart">
                                <PromotionChart messages={messages} />
                            </div>
                        </div>
                    </div>
                    <div className="slick-slider-image">
                        <SlickSliderWithImage messages={messages} />
                    </div>
                </div>
            ) : (
                <div className="empty"><span>NO DATA TO DISPLAY</span></div>
            )}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        companyId: state.filter.companyId,
        customerGroupId: state.filter.customerGroupId,
        week: state.filter.week,
        year: state.filter.year,
        company: state.filter.company,
        compareData: state.filter.compareData,
        compareCompanyIds: state.filter.compareCompanyIds
    }
}

export default connect(mapStateToProps)(OverView);