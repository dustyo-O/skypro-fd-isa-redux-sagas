import { RootAction } from './actions';

type WeatherState = {
    status?: 'geo_progress' | 'geo_success' | 'weather_progress' | 'weather_success';
    lat?: number;
    lng?: number;
    weather?: {
        description: string;
    };
};

export function weatherReducer(state = {}, action: RootAction): WeatherState {
  switch (action.type) {
        case 'WEATHER@GEO_REQUEST_START':
            return { status: 'geo_progress' };
        case 'WEATHER@GEO_REQUEST_SUCCESS':
            return {
                ...state,
                status: 'geo_success',
                lat: action.payload.lat,
                lng: action.payload.lng,
            };
        case 'WEATHER@WEATHER_REQUEST_START':
            return { ...state, status: 'weather_progress' };
        case 'WEATHER@WEATHER_REQUEST_SUCCESS':
            return {
                ...state,
                status: 'weather_success',
                weather: {
                    description: action.payload.description,
                },
            };
        default:
            return state;
    }
}
