import fetch from "isomorphic-unfetch";
import config from "../config";

export const getCompanies = (accountId) =>
    fetch(`${config.apiUrl}/accounts/${accountId}/companies`).then((res) => {
        if (res.ok) {
            return res.json();
        }
    return undefined;
});

export const getCustomerGroups = (accountId) =>
    fetch(`${config.apiUrl}/accounts/${accountId}/customer-group`).then((res) => {
        if (res.ok) {
            return res.json();
        }
    return undefined;
});

export const getData = (
     companyId, customerGroupId, week, year, sid   
    ) => {
        return fetch(
        `${config.apiUrl}/data?sid=${sid}&company_id=${companyId}&customer_group_id=${customerGroupId}&week=${week}&year=${year}`
        ).then((res) => {
        if (res.ok) {
            return res.json();
        }
        return undefined;
        });
    };

export const getHTMLPreData = (url) =>
    fetch(url).then((res) => {
        if (res.ok) {
            return res.text();
        }
        return undefined;
    });


export const getCreatedLists = (accountId, dataId, type) =>
    fetch(`${config.apiUrl}/accounts/${accountId}/list?data_id=${dataId}&type=${type}`)
    .then((res) => {
        if (res.ok) {
            return res.text();
        }
        return undefined;
    });

export const getCompareMessages = (accountId, apiDataCompanyIds, week, year) =>
    fetch(`http://192.168.0.215:5000/data-compare?sid=${accountId}&company_id=[${apiDataCompanyIds}]&week=${week}&year=${year}`)
    // fetch(`${config.apiUrl}/data-compare?sid=${accountId}&company_id=[${apiDataCompanyIds}]&week=${week}&year=${year}`)
    .then((res) => {
        if (res.ok) {
            return res.text();
        }
        return undefined;
    });

export const createNewList = (accountId, listName) =>
    fetch(`${config.apiUrl}/accounts/${accountId}/list`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: listName
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log('Failed.')
            let error = new Error(res.statusText)
            error.res = res
            return Promise.reject(error)
        }
    });

export const changeMessageStatus = (messageId, listId, status, type) =>
    fetch(`${config.apiUrl}/accounts/list-mail`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data_id: messageId,
            list_id: listId,
            status: status,
            type: type
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log('Failed.')
            let error = new Error(res.statusText)
            error.res = res
            return Promise.reject(error)
        }
    });