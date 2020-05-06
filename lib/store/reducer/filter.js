import * as ActionType from '../actionType';
import { getWeekNumber, getYear, formatDate } from '../../utils/date'

const initialState = {
    companyId: null,
    customerGroupId: null,
    startDate: '2020-01-01',
    endDate: formatDate(new Date()),
    week: getWeekNumber(),
    year: getYear(),
    messageId: null,
    uploadId: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionType.SET_COMPANY_ID:
            return {...state, companyId: action.payload}
        case ActionType.SET_CUSTOMER_GROUP_ID:
            return {...state, customerGroupId: action.payload}
        case ActionType.SET_START_DATE:
            return {...state, startDate: action.payload}
        case ActionType.SET_END_DATE:
            return {...state, endDate: action.payload}
        case ActionType.SET_WEEK:
            return {...state, week: action.payload}
        case ActionType.SET_YEAR:
            return {...state, year: action.payload}
        case ActionType.SET_MESSAGE_ID:
            return {...state, messageId: action.payload}
        case ActionType.SET_UPLOAD_ID:
            return {...state, uploadId: action.payload}
        case ActionType.SET_COMPANY:
            return {...state, company: action.payload}
        case ActionType.SET_COMARE_DATA:
            return {...state, compareData: action.payload}
        case ActionType.SET_COMARE_COMPANY_ID:
            return {...state, compareCompanyIds: action.payload}
        default:
            return state
    }
}