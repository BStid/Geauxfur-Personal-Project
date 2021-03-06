import React, { Component } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import homeIcon from "./pictures/placeholder.svg";
import profileButton from "./pictures/avatar.png";
import messagesIcon from "./pictures/envelope.png";
import paymentIcon from "./pictures/hand.png";
import historyIcon from "./pictures/open-book.png";
import safetyIcon from "./pictures/hand-shake.png";
import defaultUser from "./pictures/userDefault.png";

class SideNav extends Component {
  constructor() {
    super();
    this.state = {};
  }
  //TODO: Clean Up links with a .map pulling from database
  render() {
    return (
      <div className={this.props.sideNavClass}>
        <div className="sideNav">
          <Link to="/dashboard/content">
            <div className="homeButton">
              <img src={homeIcon} alt="home icon" className="homeIcon" />
              Dashboard
            </div>
          </Link>
          <Link to="/dashboard/profile">
            <div className="profileButton">
              <img
                src={profileButton}
                alt="profile icon"
                className="profileIcon"
                id="noInvert"
              />
              Profile
            </div>
          </Link>
          <Link to="/dashboard/messages">
            <div className="messagesButton">
              <img
                src={messagesIcon}
                alt="messages icon"
                className="messagesIcon"
                id="noInvert"
              />
              Messages
            </div>
          </Link>
          <Link to="/dashboard/payment">
            <div className="paymentButton">
              <img
                src={paymentIcon}
                alt="payment icon"
                className="paymentIcon"
              />
              Payment
            </div>
          </Link>
          <Link to="/dashboard/history">
            <div className="historyButton">
              <img
                src={historyIcon}
                alt="history icon"
                className="historyIcon"
              />
              History
            </div>
          </Link>
          <Link to="/explore">
            <div className="safetyButton">
              <img src={safetyIcon} alt="safety icon" className="safetyIcon" />
              Safety
            </div>
          </Link>
        </div>
        <div id="sideProfileCard">
          <img
            src={defaultUser}
            id="sideDefaultUser"
            alt="default user image"
          />
          <p id="sideUserName">User</p>
          <br />
          <p id="sideEmail">thisismyemail@email.com</p>
        </div>
      </div>
    );
  }
}

export default SideNav;
