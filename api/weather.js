import axios from 'axios'
import { apiKey } from '../constants'
// 907f1ec9e2684c62869212905242206

const forceastEndpoint = params=>`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`

// http://api.weatherapi.com/v1/forecast.json?key=907f1ec9e2684c62869212905242206&q=London&days=1&aqi=no&alerts=no

const locationEndpoint = params=>`http://api.weatherapi.com/v1/search.json?key=${params.apiKey}&q=${params.cityName}`

const apiCall = async (endpoint)=>{
    const options={
        methods:'GET',
        url: endpoint
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export const fetchWeatherForecast = params=>{
  
    return apiCall(forceastEndpoint(params));
}

export const fetchLocations = params=>{
    
    return apiCall(locationEndpoint(params));
}