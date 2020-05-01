import * as ActionType from '../actionType';

export const setCompanyId = (companyId) => {
    return {
        type: ActionType.SET_COMPANY_ID,
        payload: companyId
    }
}

export const setCustomerGroupId = (customerGroupId) => {
    return {
        type: ActionType.SET_CUSTOMER_GROUP_ID,
        payload: customerGroupId
    }
}

export const setStartDate = (startDate) => {
    return {
        type: ActionType.SET_START_DATE,
        payload: startDate
    }
}

export const setEndDate = (endDate) => {
    return {
        type: ActionType.SET_END_DATE,
        payload: endDate
    }
}

export const setWeek = (week) => {
    return {
        type: ActionType.SET_WEEK,
        payload: week
    }
}

export const setYear = (year) => {
    return {
        type: ActionType.SET_YEAR,
        payload: year
    }
}