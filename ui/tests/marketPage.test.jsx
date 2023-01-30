import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import {
  MarketPage,
  MarketName,
  popularCryptocurrencies,
} from "../src/pages/MarketPage/MarketPage";
import { options, appName } from "../src/components/Navbar/Navbar";
import { MemoryRouter } from "react-router-dom";

describe("MarketPage", () => {
  vi.mock("../src/hooks/useGetPrice", () => {
    const useGetPrice = vi.fn();
    useGetPrice.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: {
        prices: [
          22802.9, 22811.49, 22814.62, 22821.45, 22818.67, 22817.43, 22819.52,
          22823.07, 22821.71, 22826.45, 22832.09, 22830.3, 22827.1, 22828.79,
          22831.16, 22832.04, 22827.97, 22828.28, 22821.34, 22825.13, 22828.02,
          22827.76, 22831.62, 22837.08, 22835.22, 22826.74, 22823.56, 22822.2,
          22825.87, 22827.64, 22828.32, 22836.73, 22832.9, 22838.93, 22837.37,
          22844.58, 22842.36, 22849.69, 22850.38, 22845.91, 22851.97, 22852.85,
          22844.98, 22851.59, 22851.59, 22847.88, 22853.3, 22853.4, 22849.49,
          22844.0,
        ],
      },
    });
    return {
      useGetPrice,
    };
  });

  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <MarketPage />
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  it("should render appName + options", () => {
    screen.getByText(appName);
    expect(
      document.getElementById(`${appName}Navbar`).firstChild.textContent
    ).toBe(appName);
    options.forEach((option) => {
      expect(
        document.getElementById(`${option}Navbar`).firstChild.textContent
      ).toBe(option);
    });
  });

  it("should render only one MarketName as h1 title", () => {
    let h1MarketName;
    screen.getAllByText(MarketName).forEach((element) => {
      if (element.tagName === "H1") {
        if (h1MarketName === undefined) {
          h1MarketName = true;
        } else {
          h1MarketName = false;
        }
      }
    });
    expect(h1MarketName).toBe(true);
  });

  it("should render textbox to search", () => {
    screen.getByRole("textbox");
  });

  it("should render textbox a button to search", () => {
    expect(screen.getByRole("button")).toHaveTextContent("Buscar");
  });

  it("should render name of each popularCryptocurrencies", () => {
    popularCryptocurrencies.forEach((cryto) => {
      screen.getByText(cryto);
    });
  });
});
