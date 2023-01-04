import React from 'react';
// eslint-disable-next-line
import MenuModal from './menu-modal';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      windowWidth: 0,
      showMenu: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ keyword: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { keyword } = this.state;
    window.location.hash = `keyword?${keyword}`;
  }

  handleResize() {
    if (window.innerWidth > 700) {
      this.setState({ showMenu: true });
    }
    this.setState({ windowWidth: window.innerWidth });
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    // eslint-disable-next-line
    const { windowWidth, showMenu } = this.state;
    return (
      <div className="nav-bar">
        <div className="nav-menu-icon">
          <i className="fa-solid fa-bars" />
          {/* {
            (windowWidth > 700 || showMenu) &&
              <MenuModal />
          } */}
        </div>
        <div className="nav-search">
          <form className="nav-search-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="keyword" />
              <input
                required
                id="keyword"
                type="text"
                name="keyword"
                onChange={handleChange}
                placeholder="Type a keyword here"
                className="nav-input" />
            </div>
            <div>
              <button className="nav-button" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
