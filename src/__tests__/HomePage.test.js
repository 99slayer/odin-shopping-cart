import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { HomePage } from "../components/HomePage";

describe("HomePage component", () => {
  it("matches snapshot", () => {
    const homePageComponent = renderer.create(<HomePage />).toJSON();
    expect(homePageComponent).toMatchSnapshot();
  });
});
