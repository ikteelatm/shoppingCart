import React, {Component } from 'react';
import './Header.css';

class Header extends Component {
    /**
     * When there is a search term to handle, run the callback to for searching a course
     * @param e
     */
    setSearchTerm = e => {
        this.props.onSearchCourse(this.props.items, e.target.value);
        e.preventDefault();
    };

    /**
     *  run the callback to for sortBy
     * @param sortBy
     */
    handleSort = (sortBy) => {
        this.props.onSortBy(this.props.searchResultItems.length > 0 ? this.props.searchResultItems
            : this.props.items, sortBy);
    };

    render () {
        return (
            <div className='header'>
                <div className="search form-group has-search">
                    <span className="fa fa-search form-control-feedback"/>
                    <input onChange={this.setSearchTerm} type="text"
                           className="form-control" placeholder="Search Courses ..."/>
                </div>
                <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort By
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={() => this.handleSort('Level')}>Level</button>
                        <button className="dropdown-item" onClick={() => this.handleSort('Price')}>Price</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Header;