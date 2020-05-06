import React, { Fragment } from 'react';
import { useRouter } from "next/router";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { weekListOption, yearListOption, getWeekNumber, getYear, formatDate, getCurrentDate } from '../lib/utils/date';
import { getCompanies, getCustomerGroups } from '../lib/api';
import { getProfile } from '../lib/auth';

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

    const [accountCompanies, setAccountCompanies] = React.useState([]);
    const [accountCustomerGroups, setAccountCustomerGroups] = React.useState([]);

    const [selectedCompany, setSelectedCompany] = React.useState({company_id: null})
    const [selectedCustomerGroup, setSelectedCustomerGroup] = React.useState({customer_group_id: null})
    const [selectedweek, setSelectedWeek] = React.useState({week: currentWeek})
    const [selectedYear, setSelectedYear] = React.useState({year: currentYear})

    const {companyId, customerGroupId, week, year, dispatch} = props;

    React.useEffect(() => {
        const accountId = getProfile().id;
        setAccountId(accountId);

        // get all companies for account
        if (localStorage.getItem('accountCompanies') === null) {
            getCompanies(accountId)
            .then(data => {
                const companyData = data.data.companies;
                localStorage.setItem('accountCompanies', JSON.stringify(companyData));
                setAccountCompanies(companyData)
            }).catch(error => {
                console.log(error)
            })
        } else {
            setAccountCompanies(JSON.parse(localStorage.getItem('accountCompanies')))
        }

        // get all customer groups for account
        if (localStorage.getItem('accountCustomerGroups') === null) {
            getCustomerGroups(accountId)
            .then(data => {
                const customerGroupData = data.data.customer_group;
                localStorage.setItem('accountCustomerGroups', JSON.stringify(customerGroupData));
                setAccountCustomerGroups(customerGroupData)
            }).catch(error => {
                console.log(error)
            })
        } else {
            setAccountCustomerGroups(JSON.parse(localStorage.getItem('accountCustomerGroups')))
        }

    }, [])

    React.useEffect(() => {
        
        const tempCompanyOptions = [];
        if (accountCompanies) {
            accountCompanies.map(company => {
                let companyOption = {}
                companyOption['value'] = company.id;
                companyOption['label'] = company.name;
                tempCompanyOptions.push(companyOption)
                setCompanyOptions(tempCompanyOptions)
            })
        }
    }, [accountCompanies])

    React.useEffect(() => {
        const tempCustomerGroupOptions = [];
        if (accountCustomerGroups) {
            accountCustomerGroups.map(customerGroupd => {
                let customerGroupOption = {}
                customerGroupOption['value'] = customerGroupd.id;
                customerGroupOption['label'] = customerGroupd.name;
                tempCustomerGroupOptions.push(customerGroupOption)
            })
            setCustomerGroupOptions(tempCustomerGroupOptions)
        }
    }, [accountCustomerGroups])

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

const mapWeekStateToProps = (state) => {
    return {
        companyId: state.filter.companyId,
        customerGroupId: state.filter.customerGroupId,
        week: state.filter.week,
        year: state.filter.year
    }
}

export const FilterByWeek = connect(mapWeekStateToProps)(FilterByWeekCmp)

const FilterByDateCmp = (props) => {
    // const {selectedHub} = props;
    // console.log(selectedHub);
    const router = useRouter()
    const pathName = router.pathname.replace('/', '');

    const [accountId, setAccountId] = React.useState('')
    const [companyOptions, setCompanyOptions] = React.useState([])
    const [customerGroupOptions, setCustomerGroupOptions] = React.useState([])

    const [selectedCompany, setCompany] = React.useState({company_id: null})
    const [selectedCustomerGroup, setCustomerGroup] = React.useState({customer_group_id: null})

    const [selectedStartDate, setSelectedStartDate] = React.useState(getYear() + '-01-01');
    const [selectedEndDate, setSelectedEndDate] = React.useState(getCurrentDate());

    const {companyId, customerGroupId, startDate, endDate, dispatch} = props;

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
            setCompany({company_id: value});
            dispatch(setCompanyId(value));
        }
        if ( type === 'customer' ) {
            setCustomerGroup({customer_group_id: value});
            dispatch(setCustomerGroupId(value));
        }
        if ( type === 'startDate' ) {
            setSelectedStartDate(formatDate(value));
            dispatch(setStartDate(formatDate(value)));
        }
        if ( type === 'endDate' ) {
            setSelectedEndDate(formatDate(value));
            dispatch(setEndDate(formatDate(value)));
        }
    }

    return (
        <Fragment>
            <DatePicker 
                showPopperArrow={false}
                selected={new Date(selectedEndDate)}
                onChange={(date) => handleChange(date, 'endDate')}
            />
            <DatePicker
                showPopperArrow={false}
                selected={new Date(selectedStartDate)}
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

const mapDateStateToProps = (state) => {
    return {
        companyId: state.filter.companyId,
        customerGroupId: state.filter.customerGroupId,
        startDate: state.filter.startDate,
        endDate: state.filter.endDate
    }
}

export const FilterByDate = connect(mapDateStateToProps)(FilterByDateCmp)