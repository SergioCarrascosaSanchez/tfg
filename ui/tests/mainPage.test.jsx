import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import {
  MainPage,
  MainPageAltImages,
  mainPageTexts,
} from "../src/pages/MainPage/MainPage";

describe("MainPage", () => {
  afterEach(cleanup);

  it("should render", () => {
    render(<MainPage />);
  });

  it("should display main page title", () => {
    render(<MainPage />);
    screen.getByText(mainPageTexts.title);
  });

  it("should display main page paragraph", () => {
    render(<MainPage />);
    screen.getAllByText(mainPageTexts.mainText);
  });

  it("should display a button for login", () => {
    render(<MainPage />);
    expect(screen.getByText("Iniciar sesión").tagName).toBe("BUTTON");
  });

  it("should display market image with alt text and texts", () => {
    render(<MainPage />);
    screen.getAllByAltText(MainPageAltImages.MarketImage);
    screen.getByText(mainPageTexts.marketScreenshotTitle);
    screen.getByText(mainPageTexts.marketScreenshotText);
  });

  it("should display teacher image with alt text and texts", () => {
    render(<MainPage />);
    screen.getAllByAltText(MainPageAltImages.TeacherImage);
    screen.getByText(mainPageTexts.TeacherScreenshotTitle);
    screen.getByText(mainPageTexts.TeacherScreenshotText);
  });
});
