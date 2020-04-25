import React, { Component } from 'react';
import {REGEXP_PRICE, REGEXP_CURRENCY} from '../../Constants/Constants';
import './Cart.css';

class Cart extends Component {
    /**
     *  prepare the JSX. Truncate title for the cart in case it's beyond 38 chars.
     * @param item
     * @param key
     * @returns {*}
     */
    cartJsx = (item, key) => {
        return (
            <div key={key}>
                <li className="list-group-item">
                    <span className="title">
                        {item.title.length > 38 ? item.title.slice(0, 38) + '...' : item.title}
                    </span>
                    <span className="price">{item.price}</span>
                </li>
            </div>
        );
    };
    /**
     *  Calculate the sum of courses prices in cart list
     * @param cartList
     * @returns {string}
     */
    calcSum = (cartList) => {
        let sum = 0;
        let currency = "";
        cartList.forEach(item => {
            if(item.price) {
                sum += parseInt(item.price.match(REGEXP_PRICE)[0], 10);
                if(currency === "") {
                    currency = item.price.match(REGEXP_CURRENCY)[0];
                }
            }
        });
        return sum + currency;
    };

    render() {
        const cartListJsx = this.props.items.map((item, key) => this.cartJsx(item, key));
        const sum = this.calcSum(this.props.items);
        return (
            <div className="cart">
                <h4 className="card-header cart-header">
                    Your Cart
                </h4>
                <ul className="list-group list-group-flush">
                    {cartListJsx}
                    <div className="card-footer sum-footer">
                        <li className="list-group-item sum">
                            <span>Sum</span>
                            <span className="price">{sum}</span>
                        </li>
                    </div>
                </ul>
            </div>
        );
    }
}

export default Cart;