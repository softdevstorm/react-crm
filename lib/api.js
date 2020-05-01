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