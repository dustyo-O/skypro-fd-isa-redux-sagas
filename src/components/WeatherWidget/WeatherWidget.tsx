import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { geoRequestStart, weatherRequestStart } from '../../store/actions';

import { coordsSelector, hasGeoLocationSelector, hasWeatherDataSelector, weatherSelector } from '../../store/selectors';

export const WeatherWidget: FC = () => {
    const hasGeolocation = useSelector(hasGeoLocationSelector);
    const hasWeather = useSelector(hasWeatherDataSelector);
    const coords = useSelector(coordsSelector);
    const weather = useSelector(weatherSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!hasGeolocation) {
            dispatch(geoRequestStart());

            return;
        }

        if (!hasWeather) {
            dispatch(weatherRequestStart());
        }
    }, [dispatch, hasGeolocation, hasWeather]);

    return <div className="WeatherWidget">
        {hasGeolocation ? JSON.stringify(coords) : 'нет гео данных'}
        <br/>
        {hasWeather ? weather : 'нет погодных данных'}
    </div>;
};
