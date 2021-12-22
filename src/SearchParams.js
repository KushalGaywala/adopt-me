import { useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

// Check the status of Breed Loaded or not
function checkStatusBreed(status) {
  if (status == "loaded" || status == "unloaded") {
    return <option />;
  } else if (status == "loading") {
    return (
      <option value={status} key={status}>
        {status}
      </option>
    );
  } else {
    return <option />;
  }
}

// Function for the Component
// const SearchParams = () => {
const SearchParams = ({ locationHook, animalHook, breedHook }) => {
  /** This is destructured way
   * First is the [Variable, Function]
   * Variable Value is default from useState("DefaultValue")
   * Function definition is provided by useState HOOK
   */
  const [location, setLocation] = locationHook;
  // Hook Can also be written like this
  // const locationTuple = useState("Seattle, WA");
  // const setLocation = locationTuple[1];
  // const location = locationTuple[0];
  // const [animal, setAnimal] = useState("");
  const [animal, setAnimal] = animalHook;
  const [breed, setBreed] = breedHook;
  const [pets, setPets] = useState([]);
  const [breeds, status] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  // Take effect every time after DOM renders
  useEffect(() => {
    requestPets();
    /*
     * Even if [] is not passed it will run in infinite loop it will not know
     * empty array is needed [] is empty as it will only run on render
     * if anyTHING passed it will take effect on manipulation of that THING [THING]
     */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /*
   * async function for resquesting pets
   * because don't need to stop application for requesting pets
   */
  async function requestPets() {
    const res = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        /*
         * Stop form to reload the page and refreshing everytime
         * and load the pets
         */
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            {checkStatusBreed(status)}
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option />
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
          </select>
        </label>
        {/* Setting BackgorundColor by using the Context global variable */}
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      {/* Passing pets as parameter to Results */}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
