import React from 'react';
import Map from './dashboard/Map';
import FilterRadioButton from './dashboard/FilterRadioButtons';
import FilterSelectInput from './dashboard/FilterSelectInput';
import FileterdLocationsList from './dashboard/FilteredLocationsList';
import './dashboard.css';

export default (props) => {
  return (
    <div>
      <h3>Welcome! Sign Up or Sign In!  This is the Landing Page</h3>
      <div className="dashboard_wrapper">
        <Map
          containerElement={<div className="map_wrapper" />}
          mapElement={<div className="map_element" />}
          isMarkerShown >
        </Map>
        <div className="map_filter_wrapper">
          <FilterRadioButton/>
          <FilterSelectInput/>
          <div className="map_locations_list_wrapper">
            <div className="map_locations_list_header">Diners, Drive-ins & Dives Locations:</div>
            <FileterdLocationsList/>
          </div>
        </div>
      </div>
    </div>
  )
}