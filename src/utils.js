import React from "react";

export const rusPhoneNumberRegExp = new RegExp('^(\\+7|7|8)?[\\s\\-]?\\(?[489][0-9]{2}\\)?[\\s\\-]?[0-9]{3}[\\s\\-]?[0-9]{2}[\\s\\-]?[0-9]{2}$')

export const getLCValueByKey = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.error(`LocalStorage error happen while getting ${key}`, e)
    }
};
export const setLCValueByKey = (value, key) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.error(`LocalStorage error happen while setting ${key} with payload: ${value}`, e)
    }
};

export const renderOptionalFreePrice = (data, amountToGetFree) => {
    return (
        data.usd === 0 ? 'Free'
            :  renderPrice(data)
    )
};

export const renderPrice = (data) => {
    return (
        <>
            ${data.usd}; €{data.eur}
        </>
    )
};

export const ORDER_HISTORY_LC_KEY = 'ORDER_HISTORY';
