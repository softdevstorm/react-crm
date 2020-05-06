import React, { useState, useCallback } from "react";
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Layout from '../../components/layout';
import { getData } from '../../lib/api';
import { getProfile } from '../../lib/auth';
import WeekChart from '../../lib/charts/weekbarchart';
import DayWeekChart from '../../lib/charts/day-week-chart';
import DayWeekCompareChart from '../../lib/charts/day-week-compare-chart';
import CategoryChart from '../../lib/charts/category-chart';
import CategoryCompareChart from '../../lib/charts/category-compare-chart';
import PromotionChart from '../../lib/charts/promotion-chart';
import PromotionCompareChart from '../../lib/charts/promotion-compare-chart';
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

    React.useEffect(() => {
        if (compareCompanyIds) {
            setCompanyIds(compareCompanyIds);
            setCompareMessages(compareData);
            setDataAvailable(true);
        }
    }, [compareCompanyIds])

    return (
        <Layout title={'Overview'}>
            {dataAvailable ? ( 
                <div className="data-content">
                    <div className="weekchart-container">
                        <div className="touchpoint-counts align-self-center col-4">
                            {compareData? (
                                <ul className="list-group"> {
                                    companyIds.map(cid => (
                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={cid}>
                                            <a className="company-link" href={compareData[cid].company.website} target="_blank">
                                                <img className="compare-company-logo" src={compareData[cid].company.logo} draggable="false" />
                                                <span className="compare-company-name">{compareData[cid].company.name}</span>
                                            </a>
                                            <span className="badge badge-success badge-pill company-touchpoints-count">{compareData[cid].messages.length} TouchPoints</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="single-company-touchpoint">
                                    <span id="t_count">{totalCount}</span>
                                    <br />
                                    <span className="text">TOUCHPOINTS</span>
                                    <br />
                                </div>
                            )}
                            <span className="date-range">{`${startDate} - ${endDate}`}</span>
                        </div>
                        <div className="week-chart align-self-center col-8">
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
                                {companyIds.length > 0? (
                                    <CategoryCompareChart compareMessages={compareMessages} companyIds={companyIds} />
                                ) : (
                                    <CategoryChart messages={messages} />
                                )}                           
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="apex-chart">
                                {companyIds.length > 0? (
                                    <PromotionCompareChart compareMessages={compareMessages} companyIds={companyIds} />
                                ) : (
                                    <PromotionChart messages={messages} />
                                )}
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