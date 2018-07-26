import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewList extends Component {

  renderList() {
    // get locationId of clicked Marker.
    const locationId = this.props.mapData.locationId;

    // production
    return this.props.reviews.map((review, index) => {

      if (review.locationId === locationId) {
        return (
          <li
            key={index}
            className="review_list_li"
          >
            <div className="review_date">Date Visited:<span>{review.date}</span></div>
            <div className="review_review_header">Review:</div>
            <div className="review_review">{review.review}</div>
          </li>
        )
      }
    });

  }

  render() {
    return (
      <ul className="review_list_ul">
        {this.renderList()}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mapData: state.mapData,
    reviews: state.reviews.reviews
  }
};

export default connect(mapStateToProps, null)(ReviewList);