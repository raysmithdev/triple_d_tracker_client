import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './nav.css';

class Nav extends Component {

  renderLinks() {

    if (!this.props.authenticated && this.props.currentRoute === '/') {
      return (
        <div className="nav_links_wrapper">
          <Link to="/about">About</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    if (!this.props.authenticated && this.props.currentRoute === '/signup') {
      return (
        <div className="nav_links_wrapper">
          <Link to="/about">About</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    if (!this.props.authenticated && this.props.currentRoute === '/signin') {
      return (
        <div className="nav_links_wrapper">
          <Link to="/about">About</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )
    }

    if (!this.props.authenticated && this.props.currentRoute === '/about') {
      return (
        <div className="nav_links_wrapper">
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    if (this.props.authenticated && this.props.currentRoute === '/dashboard') {
      return (
        <div className="nav_links_wrapper">
          <Link to="/about">About</Link>
          <Link to="/signout">Sign Out</Link>
        </div>
      )
    }

    if (this.props.authenticated && this.props.currentRoute === '/about') {
      return (
        <div className="nav_links_wrapper">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/signout">Sign Out</Link>
        </div>
      )
    }

    // Handle cases when User closes Browser without signing out,
    // User will still be logged in when the Browser is opened at a later time.
    // Redirect the User back to the Dashboard.
    if (this.props.authenticated && this.props.currentRoute === '/') {
      window.location = '/dashboard';
      return false;
    }

    if (this.props.authenticated && this.props.currentRoute === '/signup') {
      window.location = '/dashboard';
      return false;
    }

    if (this.props.authenticated && this.props.currentRoute === '/signin') {
      window.location = '/dashboard';
      return false;
    }

  }

  render() {
    return (
      <div className="nav">
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    currentRoute: state.currentRoute.currentRoute
  }
};

export default connect(mapStateToProps)(Nav);