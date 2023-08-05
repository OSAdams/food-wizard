import React from 'react';
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
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ keyword: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { keyword } = this.state;
    this.setState({ keyword: '' });
    window.location.hash = `quickSearch?keyword=${keyword}`;
  }

  handleResize() {
    if (window.innerWidth > 700) {
      this.setState({ showMenu: true, windowWidth: window.innerWidth });
    } else {
      this.setState({ showMenu: false, windowWidth: window.innerWidth });
    }
  }

  // Use window hash to update menu modal display. Huge work in progress.

  handleClick() {
    const { windowWidth } = this.state;
    if (windowWidth <= 700) {
      this.setState(prevState => ({
        showMenu: !prevState.showMenu
      }));
    }
  }

  closeModal() {
    this.setState(prevState => ({ showMenu: !prevState.showMenu }));
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  render() {
    const {
      state: {
        keyword,
        showMenu
      },
      handleChange,
      handleSubmit,
      handleClick
    } = this;
    return (
      <div className="nav-bar flex">
        <div className="nav-menu-icon flex">
          <i className="fa-solid fa-bars" onClick={ handleClick } />
        </div>
        {
          showMenu === true &&
          <MenuModal />
        }
        <div className="nav-search">
          <form className="nav-search-form flex" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="keyword" />
              <input
                required
                id="keyword"
                type="text"
                name="keyword"
                onChange={handleChange}
                placeholder="Type a keyword here"
                value={ keyword }
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
