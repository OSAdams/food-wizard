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
    const { state: { keyword }, context: { route: { params } } } = this;
    this.setState({ keyword: '' });
    params.set('keyword', keyword);
    window.location.hash = `quickSearch?${params.toString()}`;
  }

  handleResize() {
    const { params, path } = this.context.route;
    if (window.innerWidth > 700) {
      params.set('showMenu', 'true');
      window.location.hash = `${path}?${params.toString()}`;
      this.setState({ showMenu: 'true', windowWidth: window.innerWidth });
    } else {
      params.set('showMenu', 'false');
      window.location.hash = `${path}?${params.toString()}`;
      this.setState({ showMenu: 'false', windowWidth: window.innerWidth });
    }
  }

  handleClick(e) {
    const { params, path } = this.context.route; // eslint-disable-line
    const showMenu = params.get('showMenu');
    if (showMenu === 'false') {
      params.set('showMenu', 'true');
      this.setState({ showMenu: 'true' });
      window.location.hash = `${path}?${params}`;
    } else {
      params.set('showMenu', 'false');
      this.setState({ showMenu: 'false' });
    }
  }

  // too many things updating state? how to i condense this

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
    console.log('showMenu in render: ', showMenu); // eslint-disable-line
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
