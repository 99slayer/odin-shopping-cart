import React, { useState, useEffect } from "react";
import "../styles/ShopPage.css"

const order = [];

// Manages order array so cart items can be rendered in the order that they are added or removed.
const changeOrder = (list) => {
  for (let product in list) {
    if (order.includes(list[product].name) && list[product].count < 1) {
      const index = order.indexOf(list[product].name);
      order.splice(index, 1);
    } else if (order.includes(list[product].name)) {
      continue;
    } else if (list[product].count < 1) {
      continue;
    } else {
      order.push(list[product].name);
    }
  }
}

export const ShopPage = () => {
  const [productList, setProductList] = useState({
    // include img urls too
    1: {
      name: 'product 1',
      cost: 30.00,
      count: 0,
      image: ''
    },
    2: {
      name: 'product 2',
      cost: 78.99,
      count: 0,
      image: ''
    },
    3: {
      name: 'product 3',
      cost: 90.00,
      count: 0,
      image: ''
    },
    4: {
      name: 'product 4',
      cost: 20.00,
      count: 0,
      image: ''
    }
  });

  // need to not allow negative product count values

  // function version that can accout for user input??
  // const incrementProduct = (productNum, input = null) => {
  //   if (input) {
  //     setProductList(prevList => ({
  //       ...prevList,
  //       [productNum]: { ...prevList[productNum], count: input }
  //     }));
  //   } else {
  //     setProductList(prevList => ({
  //     ...prevList,
  //     [productNum]: { ...prevList[productNum], count: prevList[productNum].count + 1 }
  //     }));
  //   }
  // };

  const incrementProduct = (productNum) => {
    setProductList(prevList => ({
      ...prevList,
      [productNum]: { ...prevList[productNum], count: prevList[productNum].count + 1 }
    }));
  };

  const decrementProduct = (productNum) => {
    setProductList(prevList => ({
      ...prevList,
      [productNum]: { ...prevList[productNum], count: prevList[productNum].count - 1 }
    }));
  };

  return (
    <div id="shop-page">
      <ShoppingGrid increment={incrementProduct} decrement={decrementProduct} list={productList} />
      <ShoppingCart increment={incrementProduct} decrement={decrementProduct} list={productList} />
    </div>
  );
};

const ShoppingGrid = (props) => {
  const { increment, decrement, list } = props;
  const renderCards = (obj) => {
    const elements = [];
    let i = 1

    for (let product in obj) {
      elements.push(
        <ProductCard key={i} name={obj[product].name} cost={obj[product].cost} count={obj[product].count} increment={increment} decrement={decrement} productNum={i} />
      );
      i += 1;
    };

    return elements
  }

  return (
    <div id="shopping-grid">
      {renderCards(list)}
    </div>
  )
}

const ProductCard = (props) => {
  const { name, cost, count, increment, decrement, productNum } = props;
  return (
    <div className="product-card">
      <img alt="" />
      <div>
        <p>{name}</p>
        <p>{(cost).toFixed(2)}</p>
        <div>
          <button onClick={() => decrement(productNum)}>-</button>
          <input value={count}></input>
          <button onClick={() => increment(productNum)}>+</button>
        </div>
      </div>
    </div>
  )
}

const ShoppingCart = (props) => {
  const { increment, decrement, list } = props;

  const renderItems = (obj) => {
    changeOrder(list);
    const elements = [];
    let i = 1;

    while (elements.length !== order.length) {
      for (let product in obj) {
        if (obj[product].name !== order[i - 1]) {
          continue;
        } else {
          elements.push(
            <Item key={product} name={obj[product].name} cost={obj[product].cost} count={obj[product].count} increment={increment} decrement={decrement} productNum={product} />
          );

          i += 1;
        }
      }
    }

    return elements;
  };

  return (
    <div id="shopping-cart">
      <h2 id="cart-heading">CART</h2>
      <div id="item-cont">
        {renderItems(list)}
      </div>
      <div id="cart-total-cont">YOUR TOTAL</div>
      <button id="checkout-btn">CHECKOUT</button>
    </div>
  )
}

const Item = (props) => {
  const { name, cost, count, increment, decrement, productNum } = props;

  return (
    <div className="item">
      <div className="item-info">
        <p>{name}</p>
        <p>{(cost * count).toFixed(2)}</p>
      </div>
      <div className="item-count-cont">
        <button onClick={() => decrement(productNum)}>-</button>
        <input value={count}></input>
        <button onClick={() => increment(productNum)}>+</button>
      </div>
      <button className="item-delete-btn">X</button>
    </div>
  )
}