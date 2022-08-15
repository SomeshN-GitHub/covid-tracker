import axios from "axios";
import React, { useState, useEffect } from "react";
import $ from "jquery";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";

const Table = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.covid19api.com/summary")
      .then(({ data: { Countries } }) => setCountries(Countries))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
      setTimeout(()=>{
          $("#covid_table").DataTable(); 
      },1000)
  }, [countries]);

  return (
    <div className="row justify-content-center  my-3">
      <div className="col-md-10 table-responsive ">
        <table
          id="covid_table"
          className="table table-striped my-2 table-bordered table-hover"
        >
          <thead className="table-dark my-3 ">
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Country</th>
              <th scope="col">Confirmed</th>
              <th scope="col">Active</th>
              <th scope="col">Recovered</th>
              <th scope="col">Deaths</th>
            </tr>
          </thead>
          <tbody className="">
            {countries.map((country, index) => {
              return (
                <tr key={country.ID}>
                  <th scope="row">{index}</th>
                  <td>{country.Country}</td>
                  <td>{country.TotalConfirmed}</td>
                  <td>{country.TotalConfirmed - country.TotalRecovered}</td>
                  <td>{country.TotalRecovered}</td>
                  <td>{country.TotalDeaths}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
