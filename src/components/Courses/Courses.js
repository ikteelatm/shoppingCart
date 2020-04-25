import React, { Component } from 'react';
import Course from '../Course/Course';
import '../Course/Course.css';

class Courses extends Component {
    constructor(props) {
        super(props);
        this.courses = props.items;
    }

    /**
     *  Rendering each 'Course'
     * @param item
     * @param key
     * @param courseClickHandler
     * @returns {*}
     */
    cardJsx = (item, key, courseClickHandler) => {
        return (
            <Course item={item} key={key} onItemClick={(item) => courseClickHandler(item)}/>
        );
    };

    render() {
        const items = this.props.searchResultItems.length > 0 ? this.props.searchResultItems : this.props.items;
        this.courses = items.map((item, key) => this.cardJsx(item, key, this.props.onCoursesClickHandler));
        return (
            <div className="courses row">
                {this.courses}
            </div>
        );
    }
}

export default Courses;