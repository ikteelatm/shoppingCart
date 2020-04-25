
import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import Courses from '../Courses/Courses';
import Cart from '../Cart/Cart';
import {REGEXP_PRICE, LEVEL_VALUE_MAP, COURSE_OPERATION} from '../../Constants/Constants';
import {getCourses} from './HomePageUtils';
import './HomePage.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            cartList: [],
            searchResults: [],
            sortedResult: []
        }
    }

    /**
     *  In this stage of the life cycle:
     *      1. Get the cart list data from local storage.
     *      2. wait for the asynchronous call.
     *      3. sync between cart list and list of courses
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {
        // Verify that the local storage already has data to update the current cart and courses.
        const json = localStorage.getItem('cartList');
        const cartList = json !== null ? JSON.parse(json) : [];
        this.setState(() => ({ cartList }));

        const courses = await getCourses();

        this.syncCoursesStates(courses, cartList);
        this.setState({courses: courses});
    }

    /**
     *  Use this to update the local storage and make it persistence to save the cart list
     *
     * @param prevProps
     * @param prevStates
     */
    componentDidUpdate(prevProps, prevStates){
        const output = JSON.stringify(this.state.cartList);
        localStorage.setItem('cartList', output);
    }

    /**
     *  Sync the courses according to the given local storage cart list when 1st loading    (+ , -)
     * @param courses
     * @param cartList
     */
    syncCoursesStates = (courses, cartList) => {
        cartList.forEach(cart => {
           const idxToUpdate = courses.findIndex(course => cart.id === course.id);
            courses[idxToUpdate].operation = cart.operation;
        });
    };

    /**
     * handle 'Add' or 'Remove' course
     * @param item
     */
    onCourseClick = (item) => {
        if(item.operation === COURSE_OPERATION.ADD) {
            this.setState({
                cartList: [
                    item,
                    ...this.state.cartList
                ]
            });
        } else {
            this.setState({
                cartList: this.state.cartList.filter(elem => {
                    return item.id !== elem.id;
                })
            })
        }

    };

    /**
     * Sort course either by 'Level' or 'Price'  (Descending sorting - from the lower to the highest one)
     * @param courses
     * @param sortBy
     */
    handleSortBy = (courses, sortBy) => {
        let sortedResult = [];
        if(sortBy === 'Level') // add constant
            sortedResult = courses.sort((a, b) => LEVEL_VALUE_MAP[b.level] - LEVEL_VALUE_MAP[a.level]);
        else
            sortedResult = courses.sort((a, b) =>
                parseInt(b.price.match(REGEXP_PRICE)[0], 10) - parseInt(a.price.match(REGEXP_PRICE)[0], 10));
        sortedResult.reverse();
        this.setState({sortedResult: sortedResult});
    };

    /**
     *  Search course by short description or title
     * @param courses
     * @param searchTerm
     */
    handleCourseSearch = (courses, searchTerm) => {
        const searchResults = courses.filter(course =>
            course.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.title.toLowerCase().includes(searchTerm.toLowerCase()));
        this.setState({searchResults: searchResults});
    };

    render() {
        return (
            <div className="container">
                <Navbar cartSize={this.state.cartList.length}/>
                <Header onSearchCourse={this.handleCourseSearch} onSortBy={this.handleSortBy}
                        items={this.state.courses} searchResultItems={this.state.searchResults}/>
                <div className="body">
                    <Courses onCoursesClickHandler={this.onCourseClick}
                             items={this.state.courses}
                             searchResultItems={this.state.searchResults}/>
                    <Cart items={this.state.cartList}/>
                </div>
            </div>
        );
    }
}

export default HomePage;