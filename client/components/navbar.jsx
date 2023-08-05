import React from 'react';
import MenuModal from './menu-modal';
import AppContext from '../lib/app-context';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      windowWidth: 0,
      showMenu: 'false'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
      this.setState({ showMenu: 'true', windowWidth: window.innerWidth });
    } else {
      this.setState({ showMenu: 'false', windowWidth: window.innerWidth });
    }
  }

  // 08-05-23
  // Use window hash to update menu modal display. Huge work in progress.
  // Unfortunately this has to be a rehaul, there's no way to just modify
  // what I have currently. This realization has influenced a break.

  handleClick() {
    const { state: { windowWidth }, context: { route: { path, params } } } = this;
    const showMenu = params.get('showMenu');
    if (windowWidth <= 700) {
      if (showMenu === 'false' || !showMenu) {
        params.set('showMenu', 'true');
        window.location.hash = `${path}?${params.toString()}`;
        this.setState({ showMenu: 'true' });
      } else {
        params.set('showMenu', 'false');
        window.location.hash = `${path}?${params.toString()}`;
        this.setState({ showMenu: 'false' });
      }
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    const { params } = this.context.route;
    const showMenu = params.get('showMenu');
    if (showMenu !== 'true') this.setState({ showMenu: 'false' });
  }

  // fucking menu close pls jesus.

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
          showMenu === 'true' &&
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

NavBar.contextType = AppContext;
