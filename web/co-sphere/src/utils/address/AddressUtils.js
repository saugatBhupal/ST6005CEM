const { countries } = require("../../store/AddressStore");

export function getAllCountries() {
  var countriesList = [];
  countries.forEach((country) => {
    countriesList.push(country.name);
  });
  return countriesList;
}

export function getStatesOfCountry(countryName) {
  var statesList = [];
  const selectedCountry = countries.find(
    (country) => country.name === countryName
  );

  if (selectedCountry) {
    selectedCountry.states.forEach((state) => {
      statesList.push(state.name);
    });
  } else {
    console.log("Country not found.");
  }
  return statesList;
}
