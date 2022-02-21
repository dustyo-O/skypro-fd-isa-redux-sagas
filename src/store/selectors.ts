import { RootState } from "./store";

export const hasGeoLocationSelector = (state: RootState) => Boolean(state.lat);
export const hasWeatherDataSelector = (state: RootState) => Boolean(state.weather);

export const coordsSelector = (state: RootState) => ({ lat: state.lat, lng: state.lng });
export const weatherSelector = (state: RootState) => state.weather?.description;
