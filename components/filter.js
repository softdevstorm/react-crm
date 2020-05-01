import React, { Fragment } from 'react';
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { weekListOption, yearListOption, getWeekNumber, getYear, formatDate } from '../lib/utils/date';
import { getCompanies, getCustomerGroups } from '../lib/api';
import { getProfile } from '../lib/auth';
import { connect } from "react-redux";

import {
    setCompanyId, 
    setCustomerGroupId, 
    setWeek, 
    setYear, 
    setStartDate, 
    setEndDate
} from '../lib/store/action/filter';

const FilterByWeekCmp = (props) => {

    const currentWeek = getWeekNumber();
    const currentYear = getYear();
    const weekOptions = weekListOption();
    const yearOptions = yearListOption();

    const [accountId, setAccountId] = React.useState('')
    const [companyOptions, setCompanyOptions] = React.useState([])
    const [customerGroupOptions, setCustomerGroupOptions] = React.useState([])

    const [selectedCompany, setSelectedCompany] = React.useState({company_id: null})
    const [selectedCustomerGroup, setSelectedCustomerGroup] = React.useState({customer_group_id: null})
    const [selectedweek, setSelectedWeek] = React.useState({week: currentWeek})
    const [selectedYear, setSelectedYear] = React.useState({year: currentYear})

    const {companyId, customerGroupId, week, year, dispatch} = props;

    React.useEffect(() => {
        const accountId = getProfile().id;
        setAccountId(accountId);

        // get all companies for account
        const tempCompanyOptions = [];
        getCompanies(accountId)
        .then(data => {
            const companyData = data.data.companies;
            companyData.map(company => {
                let companyOption = {}
                companyOption['value'] = company.id;
                companyOption['label'] = company.name;
                tempCompanyOptions.push(companyOption)
            })
            setCompanyOptions(tempCompanyOptions)
        }).catch(error => {
            console.log(error)
        })
        
        // get all customer groups for account
        const tempCustomerGroupOptions = [];
        getCustomerGroups(accountId)
        .then(data => {
            const customerGroupData = data.data.customer_group;
            customerGroupData.map(customerGroupd => {
                let customerGroupOption = {}
                customerGroupOption['value'] = customerGroupd.id;
                customerGroupOption['label'] = customerGroupd.name;
                tempCustomerGroupOptions.push(customerGroupOption)
            })
            setCustomerGroupOptions(tempCustomerGroupOptions)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    let handleChange = (value, type) => {
        if ( type === 'company' ) {
            setSelectedCompany({company_id: value});
            dispatch(setCompanyId(value));
        }
        if ( type === 'customer' ) {
            setSelectedCustomerGroup({customer_group_id: value});
            dispatch(setCustomerGroupId(value));
        }
        if ( type === 'week' ) {
            setSelectedWeek({week: value});
            dispatch(setWeek(value));
        }
        if ( type === 'year' ) {
            setSelectedYear({week: value});
            dispatch(setYear(value));
        }
    }

    return (
        <Fragment>
            <Select
                instanceId="yearSelect"
                defaultValue={yearOptions.filter(option => option.value === currentYear)}
                placeholder={<div>Select a Year</div>}
                options={yearOptions}
                onChange={(opt) => handleChange(opt.value, 'year')} />
            <Select
                instanceId="weekSelect"
                defaultValue={weekOptions.filter(option => option.value === currentWeek)}
                placeholder={<div>Select a Week</div>}
                options={weekOptions}
                onChange={(opt) => handleChange(opt.value, 'week')} />
            <Select
                instanceId="accountCustomerGroupSelect"
                placeholder={<div>Customer Group</div>}
                defaultValue={customerGroupOptions[0]}
                options={customerGroupOptions}
                onChange={(opt) => handleChange(opt.value, 'customer')} />
            <Select
                instanceId="accountCompanySelect"
                placeholder={<div>Companies</div>}
                defaultValue={companyOptions[0]}
                options={companyOptions}
                onChange={(opt) => handleChange(opt.value, 'company')} />
        </Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        companyId: state.filter.companyId,
        customerGroupId: state.filter.customerGroupId,
        week: state.filter.week,
        year: state.filter.year
    }
}

export const FilterByWeek = connect(mapStateToProps)(FilterByWeekCmp)

export const FilterByDate = ({
        companyChange,
        customerGroupChange,
        startDateChange,
        endDateChange
    }) => {
    // const {selectedHub} = props;
    // console.log(selectedHub);
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');

    const [accountId, setAccountId] = React.useState('')
    const [companyOptions, setCompanyOptions] = React.useState([])
    const [customerGroupOptions, setCustomerGroupOptions] = React.useState([])

    const [startDate, setStartDate] = React.useState(new Date('2020-01-01'));
    const [endDate, setEndDate] = React.useState(new Date());

    const [selectedCompany, setCompany] = React.useState({company_id: null})
    const [selectedCustomerGroup, setCustomerGroup] = React.useState({customer_group_id: null})
    const [selectedStartDate, setSelectedStartDate] = React.useState({start_date: formatDate(startDate)})
    const [selectedEndDate, setSelectedEndDate] = React.useState({end_date: formatDate(endDate)})

    React.useEffect(() => {
        const accountId = getProfile().id;
        setAccountId(accountId);

        // get all companies for account
        const tempCompanyOptions = [];
        getCompanies(accountId)
        .then(data => {            
            const companyData = data.data.companies;
            companyData.map(company => {
                let companyOption = {}
                companyOption['value'] = company.id;
                companyOption['label'] = company.name;
                tempCompanyOptions.push(companyOption)
            })
            setCompanyOptions(tempCompanyOptions)
        }).catch(error => {
            console.log(error)
        })
        
        // get all customer groups for account
        const tempCustomerGroupOptions = [];
        getCustomerGroups(accountId)
        .then(data => {
            const customerGroupData = data.data.customer_group;
            customerGroupData.map(customerGroupd => {
                let customerGroupOption = {}
                customerGroupOption['value'] = customerGroupd.id;
                customerGroupOption['label'] = customerGroupd.name;
                tempCustomerGroupOptions.push(customerGroupOption)
            })
            setCustomerGroupOptions(tempCustomerGroupOptions)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    let handleChange = (value, type) => {
        if ( type === 'company' )  setCompany({company_id: value});
        if ( type === 'customer' ) setCustomerGroup({customer_group_id: value});
        if ( type === 'startDate' ) {
            setStartDate(value);
            setSelectedStartDate({start_date: formatDate(value)});
        }
        if ( type === 'endDate' ) {
            setEndDate(value)
            setSelectedEndDate({end_date: formatDate(value)});
        }
    }

    return (
        <Fragment>
            <DatePicker 
                showPopperArrow={false}
                selected={endDate}
                onChange={(date) => handleChange(date, 'endDate')}
            />
            <DatePicker
                showPopperArrow={false}
                selected={startDate}
                onChange={(date) => handleChange(date, 'startDate')}
            />
            { pathName.includes('traffic') ? ('') : (
                <Select
                    instanceId="accountCustomerGroupSelect"
                    placeholder={<div>Customer Group</div>}
                    defaultValue={customerGroupOptions[0]}
                    options={customerGroupOptions}
                    onChange={(opt) => handleChange(opt.value, 'customer')} />
            )}
            <Select
                instanceId="accountCompanySelect"
                placeholder={<div>Companies</div>}
                defaultValue={companyOptions[0]}
                options={companyOptions}
                onChange={(opt) => handleChange(opt.value, 'company')} />
        </Fragment>
    )
};