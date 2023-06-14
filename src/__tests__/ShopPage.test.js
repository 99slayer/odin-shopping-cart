import React, { useState } from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import { ShopPage } from "../components/ShopPage";

const MockShopPage = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<MockApp />}>
          <Route index element={<ShopPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

const MockApp = () => {
  const [productList, setProductList] = useState({
    1: {
      name: "Toast Master 5000",
      cost: 125.99,
      count: 0,
      image: "toaster-1.jpg",
    },
    2: {
      name: "Toastie Classic",
      cost: 35.99,
      count: 0,
      image: "toaster-2.jpg",
    },
    3: {
      name: "Toastie Classic 2",
      cost: 40.0,
      count: 0,
      image: "toaster-3.jpg",
    },
    4: {
      name: "Toast Box",
      cost: 50.0,
      count: 0,
      image: "toaster-4.jpg",
    },
    5: {
      name: "Toast Box Supreme",
      cost: 70.0,
      count: 0,
      image: "toaster-5.jpg",
    },
    6: {
      name: "Toast Box Lite",
      cost: 35.99,
      count: 0,
      image: "toaster-6.jpg",
    },
    7: {
      name: "Industrial Toaster",
      cost: 200.0,
      count: 0,
      image: "toaster-7.jpg",
    },
    8: {
      name: "The Original",
      cost: 40.0,
      count: 0,
      image: "toaster-8.jpg",
    },
    9: {
      name: "Multi-Toast 5",
      cost: 85.0,
      count: 0,
      image: "toaster-9.jpg",
    },
  });

  return (
    <>
      <Outlet context={[productList, setProductList]} />
    </>
  );
};

describe("ShopPage component", () => {
  it("matches snapshot", () => {
    const shopPageComponent = renderer.create(<MockShopPage />).toJSON();
    expect(shopPageComponent).toMatchSnapshot();
  });

  describe("product card component", () => {
    it("product card increment button adds to product count", () => {
      render(<MockShopPage />);
      act(() =>
        userEvent.click(screen.getByTestId("product-card-increment-1"))
      );
      expect(screen.getByTestId("product-card-input-1").value).toBe("1");

      act(() =>
        userEvent.click(screen.getByTestId("product-card-increment-2"))
      );
      expect(screen.getByTestId("product-card-input-2").value).toBe("1");

      act(() =>
        userEvent.dblClick(screen.getByTestId("product-card-increment-3"))
      );
      expect(screen.getByTestId("product-card-input-3").value).toBe("2");
    });

    it("product card decrement button subtracts from count", () => {
      render(<MockShopPage />);
      act(() =>
        userEvent.dblClick(screen.getByTestId("product-card-increment-1"))
      );
      act(() =>
        userEvent.dblClick(screen.getByTestId("product-card-increment-1"))
      );
      act(() =>
        userEvent.click(screen.getByTestId("product-card-decrement-1"))
      );
      expect(screen.getByTestId("product-card-input-1").value).toBe("3");
    });
  });

  describe("cart item component", () => {
    beforeEach(() => {
      render(<MockShopPage />);
      act(() =>
        userEvent.click(screen.getByTestId("product-card-increment-1"))
      );
    });

    it("cart item to render after adding it via the product card", () => {
      expect(screen.getByTestId("cart-item-1")).toBeInTheDocument();
    });

    it("cart item to be removed after decrementing it below 1", () => {
      act(() =>
        userEvent.click(screen.getByTestId("product-card-decrement-1"))
      );
      expect(screen.queryByTestId("cart-item-1")).toBeNull();
    });

    it("cart item to be removed after deleting it via the item delete button", () => {
      act(() => userEvent.click(screen.getByTestId("item-delete-btn-1")));
      expect(screen.queryByTestId("cart-item-1")).toBeNull();
    });
  });
});
