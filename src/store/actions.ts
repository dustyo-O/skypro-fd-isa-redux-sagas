export const ACTION_WEATHER_GEO_REQUEST_START = 'WEATHER@GEO_REQUEST_START' as const;
export const ACTION_WEATHER_GEO_REQUEST_SUCCESS = 'WEATHER@GEO_REQUEST_SUCCESS' as const;
export const ACTION_WEATHER_WEATHER_REQUEST_START = 'WEATHER@WEATHER_REQUEST_START' as const;
export const ACTION_WEATHER_WEATHER_REQUEST_SUCCESS = 'WEATHER@WEATHER_REQUEST_SUCCESS' as const;

export function geoRequestStart() {
    return {
        type: ACTION_WEATHER_GEO_REQUEST_START,
    };
}

export function geoRequestSuccess(lat: number, lng: number) {
    return {
        type: ACTION_WEATHER_GEO_REQUEST_SUCCESS,
        payload: {
            lat, lng
        },
    };
}

export function weatherRequestStart() {
    return {
        type: ACTION_WEATHER_WEATHER_REQUEST_START,
    };
}

export function weatherRequestSuccess(description: string) {
    return {
        type: ACTION_WEATHER_WEATHER_REQUEST_SUCCESS,
        payload: {
            description,
        }
    };
}

export type ActionGeoRequestStart = ReturnType<typeof geoRequestStart>;
export type ActionGeoRequestSuccess = ReturnType<typeof geoRequestSuccess>;
export type ActionWeatherRequestStart = ReturnType<typeof weatherRequestStart>;
export type ActionWeatherRequestSuccess = ReturnType<typeof weatherRequestSuccess>;

export type RootAction =
    | ActionGeoRequestStart
    | ActionGeoRequestSuccess
    | ActionWeatherRequestStart
    | ActionWeatherRequestSuccess
    ;
