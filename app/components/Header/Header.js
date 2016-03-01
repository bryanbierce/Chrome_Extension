import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setViewAndFolder } from '../../actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      logoutCursor: 'auto',
    }
    this.showHamburgOrArrow = this.showHamburgOrArrow.bind(this);
    this.goBack = this.goBack.bind(this);
    this.logout = this.logout.bind(this);
    this.changeCursor = this.changeCursor.bind(this);
  }
  showHamburgOrArrow() {
    if (this.props.view === 'main') {
      return <i className="material-icons">menu</i>;
    }
    return <i onClick={this.goBack} className="material-icons">arrow_back</i>;
  }
  goBack() {
    this.props.setViewAndFolder('main', '');
    this.props.history.goBack();
  }
  logout() {
    this.props.history.push({pathname: 'login'});
  }
  changeCursor() {
    const logoutCursor = this.state.logoutCursor === 'auto' ? 'pointer' : 'auto';
    this.setState({ logoutCursor });
  }
  render() {
    return (
      <header>
        <div className="flex-1">
          { this.showHamburgOrArrow() }
        </div>
        <div className="flex text-center">
          <img src='logo.svg' />
        </div>
        <div className="flex-1">
          <i className="material-icons"
            onClick={ this.logout }
            onMouseEnter={ this.changeCursor }
            onMouseLeave={ this.changeCursor }
            style={{ cursor: this.state.logoutCursor }}
          >clear</i>
        </div>

      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    view: state.app.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators( { setViewAndFolder }, dispatch )
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
