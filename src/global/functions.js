import { COUNTRIES } from "./constants"

function getCountry (countryId) {
    return COUNTRIES.filter(country => country.id === countryId)[0];
}

export {getCountry}