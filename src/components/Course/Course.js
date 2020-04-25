import React, { Component } from 'react';
import './Course.css';
import {COURSE_OPERATION} from '../../Constants/Constants';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAddedToCart: props.item.operation &&  props.item.operation === COURSE_OPERATION.ADD
        };
    }

    /**
     *  Handling when adding to cart or removing from cart been clicked
     * @param item
     * @param operation
     */
    handleOperation = (item, operation) => {
        item.operation = operation;
        this.setState({isAddedToCart: !this.state.isAddedToCart});
        this.props.onItemClick(item);
    };

    render() {
        const {item} = this.props;
        return (
            <div className="my-card col-sm-6">
                <div className="card mb-3 shadow-sm h-100">
                    <div className="card-header">
                        {item.title}
                    </div>
                    <div className="card-body flex-column">
                        <p className="card-text">{item.shortDesc}</p>
                    </div>
                    <div className="card-footer">
                        <ul className="price_and_level list-group list-group-flush">
                            <li className="list-group-item">
                                <span className='product-price'>Price: {item.price}</span>
                            </li>
                            <li className="list-group-item">
                                <span className='product-level'>Level: {item.level}</span>
                            </li>
                        </ul>
                        <div className="add_remove_course">
                            <button className="btn btn-primary add-course" disabled={this.state.isAddedToCart}
                                    onClick={() => this.handleOperation(item, COURSE_OPERATION.ADD)}>+</button>
                            <button className="btn btn-danger remove-course" disabled={!this.state.isAddedToCart}
                                    onClick={() => this.handleOperation(item, COURSE_OPERATION.REMOVE)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;