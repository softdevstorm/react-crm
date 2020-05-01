import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';
import Layout from '../../components/layout';
import { getData } from '../../lib/api';
import { getProfile } from '../../lib/auth';
import WeekChart from '../../lib/charts/weekbarchart';
import DayWeekChart from '../../lib/charts/day-week-chart';
import CategoryChart from '../../lib/charts/category-chart';
import PromotionChart from '../../lib/charts/promotion-chart';
import SlickSliderWithImage from '../../lib/utils/slick-slider';

const OverView = (props) => {
    const [company, setCompany] = React.useState(null);
    const {companyId, customerGroupId, week, year} = props;
    const [sid, setSid] = React.useState(0);
    const [dataAvailable, setDataAvailable] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [totalCount, setTotalCount] = React.useState('');

    React.useEffect(() => {
        const id = getProfile().id;
        setSid(id);
    }, [])

    React.useEffect(() => {
        const id = getProfile().id;
        setSid(id);
        if ((companyId || companyId === 0) && (customerGroupId || customerGroupId === 0) && week && year) {
            getData(companyId, customerGroupId, week, year, id)
            .then(data => {
                setCompany(data.data.company);
                setTotalCount(data.data.count);
                setStartDate(data.data.start_date);
                setEndDate(data.data.end_date);
                let resMessages = data.data.messages;
                setMessages(resMessages)
                if (resMessages.length > 0) {
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
                            <WeekChart messages={messages} />
                        </div>
                    </div>
                    <div className="multi-chart-container">
                        <div className="col-4">
                            <div className="apex-chart">
                                <DayWeekChart messages={messages} />
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
        year: state.filter.year
    }
}

export default connect(mapStateToProps)(OverView);