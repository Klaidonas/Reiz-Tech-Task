import './styles/style.css';
import './styles/navigation.css';
import './styles/countriesList.css';
import './styles/pagination.css';
import { useEffect, useState } from 'react';
import CountryList from './components/CountriesList';
import { Fetch, Filter, Sort } from './functions';
import { ICountryData, IDATA, ISort } from './interfaces';
import Nav from './components/nav';

function App() {
  const [dataCopy, setDataCopy] = useState<ICountryData[]>([]);
  const [filteredData, setFilteredData] = useState<ICountryData[]>([]);
  const [order, setOrder] = useState("DSC");

  useEffect(() => {
    fetchCountries();
  }, [])

  /*    fetching data(countries)     */
  const fetchCountries = async() => {
    const {countries, error }:IDATA = await Fetch("https://restcountries.com/v2/all?fields=name,region,area");
    setDataCopy(countries);
    setFilteredData(countries);
    if(error) alert(error)
    console.log("data fetched(fetchCountries)")
    console.log(countries);
  }

  /*    FILTER     */
  const handleFilter = async(filter:string) => {
    const {newFilteredData} = Filter(filter, filteredData as ICountryData[], dataCopy as ICountryData[]);
    setFilteredData(newFilteredData);
    console.log("filter: " + filter);
  }

  /*    SORTING     */
  const sorting = async ()=> {
    const { sorted, newOrder }:ISort = await Sort(filteredData as ICountryData[], order);
    setFilteredData(sorted);
    setOrder(newOrder);
    console.log("sort order: " + order);
  }

  return (
    <div className="content">
      <h1>{filteredData ? "Reiz Tech Task" : "data error"}</h1>
      <Nav handleFilter = {handleFilter} sorting = {sorting} />
      {filteredData.length ?
        <CountryList filteredData={filteredData} />
        :
        <div className='loading'>Loading data</div>
        }
    </div>
  );
}
export default App;