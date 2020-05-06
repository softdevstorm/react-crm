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

export const setMessageId = (messageId) => {
    return {
        type: ActionType.SET_MESSAGE_ID,
        payload: messageId
    }
}

export const setUploadId = (uploadId) => {
    return {
        type: ActionType.SET_UPLOAD_ID,
        payload: uploadId
    }
}

export const setCompany = (company) => {
    return {
        type: ActionType.SET_COMPANY,
        payload: company
    }
}

export const setCompareData = (compareData) => {
    return {
        type: ActionType.SET_COMARE_DATA,
        payload: compareData
    }
}

export const setCompareCompanyIds = (compareCompanyIds) => {
    return {
        type: ActionType.SET_COMARE_COMPANY_ID,
        payload: compareCompanyIds
    }
}