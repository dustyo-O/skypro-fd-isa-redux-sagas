import { call, put, select, takeLeading } from 'redux-saga/effects'

import { ActionGeoRequestStart, ACTION_WEATHER_GEO_REQUEST_START, ACTION_WEATHER_WEATHER_REQUEST_START, geoRequestSuccess, weatherRequestSuccess } from "./actions";
import { coordsSelector } from './selectors';
import { Coords } from './types';

function getGeolocation() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(function(data) {
            resolve({
                lat: data.coords.latitude,
                lng: data.coords.longitude,
            });
        }, function(error) {
            reject(error);
        })
    });
}

function getWeatherData(coords: Coords) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=тут токен`)
        .then(response => response.json())
        .then(data => ({
            description: data.weather[0].description,
        }));
}

function* geoRequestSaga() {
    console.log('geoRequestSaga saga');
    try {
       const response: Coords = yield call(getGeolocation);

       yield put(geoRequestSuccess(response.lat, response.lng));
    } catch (e) {
       if (!(e instanceof Error)) return;

       console.error(e);
       //yield put(registerError(e.message));
    }
}

function* weatherRequestSaga() {
    console.log('weatherRequestSaga saga');
    try {
        const coords: Coords = yield select(coordsSelector);

        const response: { description: string } = yield call(getWeatherData, coords);

        yield put(weatherRequestSuccess(response.description));
    } catch (e) {
        if (!(e instanceof Error)) return;

        console.error(e);
       //yield put(registerError(e.message));
    }
}

export function* rootSaga() {
   yield takeLeading(ACTION_WEATHER_GEO_REQUEST_START, geoRequestSaga);
   yield takeLeading(ACTION_WEATHER_WEATHER_REQUEST_START, weatherRequestSaga);
}
