import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  clearLocationsFromList,
  createUsLocationsList,
  createVisitedLocationsUiList,
  setLatLonZoomForUiList,
  setUsersNearmeData,
} from '../../actions/action_locations';
import {
  selectedRadioButton
} from '../../actions/action_radio_button';
import radioButtonConfig from '../../configs/radioButtonConfig';
import mapConfig from '../../configs/mapConfig';
import './filter_radio_buttons_select_input.css';

class FilterRadioButtons extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedRadio: 'us' };
  }

  handleOnChange(e) {
    let uiListRecenterCoords;
    const radioButtonValue = e.target.value;
    this.setState({selectedRadio: radioButtonValue});

    if (radioButtonValue === radioButtonConfig.us) {
      this.props.selectedRadioButton(radioButtonValue); // controls Map Filter Select Input.
      // Store the US's re-center coords.
      // uiListRecenterCoords needed when User clicks "Map All Listed Locations" button.
      uiListRecenterCoords = {
        lat: mapConfig.US.lat,
        lon: mapConfig.US.lon,
        zoom: mapConfig.US.zoom
      };
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      // For clicking "Map All Listed Locations" button - END.

      this.props.clearLocationsFromList();
      this.props.createUsLocationsList();  // when User re-clicks USA button.
    }

    if (radioButtonValue === radioButtonConfig.state) {
      this.props.selectedRadioButton(radioButtonValue);
      // Note: for US States, setLatLonZoomForUiList() occurs when a US State is selected from Select Input.
      this.props.clearLocationsFromList();
    }

    if (radioButtonValue === radioButtonConfig.visited) {

      this.props.selectedRadioButton(radioButtonValue);

      // For clicking "Map All Listed Locations" button - BEGIN.
      // Store the US's re-center coords.
      // uiListRecenterCoords needed when User clicks "Map All Listed Locations" button.
      uiListRecenterCoords = {
        lat: mapConfig.US.lat,
        lon: mapConfig.US.lon,
        zoom: mapConfig.US.zoom
      };
      this.props.setLatLonZoomForUiList(uiListRecenterCoords);
      // For clicking "Map All Listed Locations" button - END.

      this.props.clearLocationsFromList();
      this.props.createVisitedLocationsUiList();  // when User re-clicks Visited button.
    }

    // TODO - nearme
    if (radioButtonValue === radioButtonConfig.nearme) {
      this.props.selectedRadioButton(radioButtonValue);
      // Note 1:
      //    "nearme", values for setLatLonZoomForUiList()
      //    are set when a "nearme" distance is selected from Select Input.

      // NOTE 2:
      //    Each time the "nearme" radio button is clicked,
      //    setUsersNearmeData() needs to be called and data cleared,
      //    so the User's Location marker doesn't display when User
      //    re-selects the "nearme" button.
      const usersNearmeData = {
        distanceMeters: '',
        lat: '',
        lon: ''
      };
      this.props.setUsersNearmeData(usersNearmeData);

      this.props.clearLocationsFromList();
      // NOTE: No need to createNearmeLocationsUiList action/reducer b/c this
      //       list data is re-fectched on each "nearme" Select Input selection.
    }
  }

  render()  {
    return (
      <div className="filter_radio_buttons_wrapper">
        <div className="filter_radio_button_header">Filter By:</div>
        <form className="form_filter_radio_buttons">
          <div className="filter_radio_button">
            <input
              id="radio_us"
              type="radio"
              name="filter_by"
              value="us"
              checked={this.state.selectedRadio === radioButtonConfig.us}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_us">USA</label>
          </div>
          <div className="filter_radio_button">
            <input
              id="radio_states"
              type="radio"
              name="filter_by"
              value="state"
              checked={this.state.selectedRadio === radioButtonConfig.state}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_states">States</label>
          </div>
          <div className="filter_radio_button">
            <input
              id="radio_visited"
              type="radio"
              name="filter_by"
              value="visited"
              checked={this.state.selectedRadio === radioButtonConfig.visited}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_states">Visited</label>
          </div>
          <div className="filter_radio_button">
            <input
              id="radio_nearme"
              type="radio"
              name="filter_by"
              value="nearme"
              checked={this.state.selectedRadio === radioButtonConfig.nearme}
              onChange={e => this.handleOnChange(e)}
            />
            <label htmlFor="radio_nearme">Near Me</label>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, {
  setLatLonZoomForUiList,
  clearLocationsFromList,
  createUsLocationsList,
  createVisitedLocationsUiList,
  selectedRadioButton,
  setUsersNearmeData
})(FilterRadioButtons);