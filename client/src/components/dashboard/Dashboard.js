import React, { Component } from "react";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.history.push("/login");
  };

render() {
    const { name } = this.props.location.state;

return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> <h4>{name}</h4>
              <p className="flow-text grey-text text-darken-1">
                You are logged into a{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

