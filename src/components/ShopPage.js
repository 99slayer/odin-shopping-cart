import React from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/ShopPage.css";

const order = [];

// Manages order array so cart items can be rendered in the order that they are added or removed.
const changeOrder = (list) => {
  for (const product in list) {
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
};

export const ShopPage = () => {
  const [productList, setProductList] = useOutletContext();

  const incrementProduct = (productNum) => {
    if (productList[productNum].count === 999) {
      return;
    }

    setProductList((prevList) => ({
      ...prevList,
      [productNum]: {
        ...prevList[productNum],
        count: parseInt(prevList[productNum].count + 1),
      },
    }));
  };

  const decrementProduct = (productNum) => {
    if (productList[productNum].count === 0) {
      return;
    }

    setProductList((prevList) => ({
      ...prevList,
      [productNum]: {
        ...prevList[productNum],
        count: parseInt(prevList[productNum].count - 1),
      },
    }));
  };

  const removeProduct = (productNum) => {
    setProductList((prevList) => ({
      ...prevList,
      [productNum]: { ...prevList[productNum], count: 0 },
    }));
  };

  // For dealing with user input.
  const handleProductInput = (productNum, e) => {
    if (e.target.value.length > 3 && e.target.key !== "Backspace") {
      return;
    }

    if (e.target.value[0] === "0") {
      const arr = e.target.value.split("");
      arr.splice(0, 1);
      e.target.value = arr.join("");
    }

    if (e.target.value === "") {
      e.target.value = "0";
    }

    setProductList((prevList) => ({
      ...prevList,
      [productNum]: {
        ...prevList[productNum],
        count: parseInt(e.target.value),
      },
    }));
  };

  const getTotal = (list) => {
    let total = 0;

    for (const product in list) {
      total += list[product].count * list[product].cost;
    }

    return total > 0 ? total.toFixed(2) : "";
  };

  return (
    <div id="shop-page">
      <ShoppingGrid
        increment={incrementProduct}
        decrement={decrementProduct}
        inputFunc={handleProductInput}
        list={productList}
      />
      <ShoppingCart
        increment={incrementProduct}
        decrement={decrementProduct}
        removeProduct={removeProduct}
        inputFunc={handleProductInput}
        totalFunc={getTotal}
        list={productList}
      />
    </div>
  );
};

const ShoppingGrid = (props) => {
  const { increment, decrement, inputFunc, list } = props;

  const renderCards = (obj) => {
    const elements = [];
    let i = 1;

    for (const product in obj) {
      elements.push(
        <ProductCard
          key={i}
          name={obj[product].name}
          cost={obj[product].cost}
          count={obj[product].count}
          image={obj[product].image}
          increment={increment}
          decrement={decrement}
          inputFunc={inputFunc}
          productNum={i}
        />
      );
      i += 1;
    }

    return elements;
  };

  return <div id="shopping-grid">{renderCards(list)}</div>;
};

const ProductCard = (props) => {
  const {
    name,
    cost,
    count,
    image,
    increment,
    decrement,
    inputFunc,
    productNum,
  } = props;

  const handleKeyDown = (e) => {
    const validInputs = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Backspace",
    ];

    if (!validInputs.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="product-card">
      <img alt="" src={image} />
      <div className="product-card-infobar">
        <p className="product-card-name">{name}</p>
        <p className="product-card-cost">{"$" + cost.toFixed(2)}</p>
        <div className="product-card-count">
          <svg width={20} height={20}>
            <a onClick={() => decrement(productNum)}>
              <polygon className="decrement-btn" points="3,10 20,0 20,20" />
            </a>
          </svg>
          <input
            type="number"
            value={count}
            maxLength={3}
            onChange={(e) => {
              inputFunc(productNum, e);
            }}
            onKeyDown={handleKeyDown}
          ></input>
          <svg width={20} height={20}>
            <a onClick={() => increment(productNum)}>
              <polygon className="increment-btn" points="17,10 0,20 0,0" />
            </a>
          </svg>
        </div>
      </div>
    </div>
  );
};

const ShoppingCart = (props) => {
  const { increment, decrement, removeProduct, inputFunc, totalFunc, list } =
    props;

  const renderItems = (obj) => {
    changeOrder(list);
    const elements = [];
    let i = 1;

    while (elements.length !== order.length) {
      for (const product in obj) {
        if (obj[product].name !== order[i - 1]) {
          continue;
        } else {
          elements.push(
            <Item
              key={product}
              name={obj[product].name}
              cost={obj[product].cost}
              count={obj[product].count}
              increment={increment}
              decrement={decrement}
              removeProduct={removeProduct}
              inputFunc={inputFunc}
              productNum={product}
            />
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
      <div id="item-cont">{renderItems(list)}</div>
      {/* can the getTotal function be moved to this component? */}
      <div
        id="cart-total"
        className={totalFunc(list) === "" ? "no-total" : ""}
      >{`TOTAL: $${totalFunc(list)}`}</div>
      <button id="checkout-btn">CHECKOUT</button>
    </div>
  );
};

const Item = (props) => {
  const {
    name,
    cost,
    count,
    increment,
    decrement,
    removeProduct,
    inputFunc,
    productNum,
  } = props;

  const handleKeyDown = (e) => {
    const validInputs = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Backspace",
    ];

    if (!validInputs.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="item">
      <p className="item-name">{name}</p>
      <p className="item-cost">{"$" + (cost * count).toFixed(2)}</p>
      <div className="item-count-cont">
        <svg width={20} height={20}>
          <a onClick={() => decrement(productNum)}>
            <polygon className="decrement-btn" points="3,10 20,0 20,20" />
          </a>
        </svg>
        <input
          type="number"
          value={count}
          maxLength={3}
          onChange={(e) => {
            inputFunc(productNum, e);
          }}
          onKeyDown={handleKeyDown}
        ></input>
        <svg width={20} height={20}>
          <a onClick={() => increment(productNum)}>
            <polygon className="increment-btn" points="17,10 0,20 0,0" />
          </a>
        </svg>
      </div>
      <button
        type="button"
        className="item-delete-btn"
        onClick={() => removeProduct(productNum)}
      >
        X
      </button>
    </div>
  );
};
