import { describe, it, expect } from "vitest"
import { cleanup, render, screen } from "@testing-library/react";
import { MarketPage, MarketName, popularCryptocurrencies, popularCryptocurrenciesPrices } from '../src/pages/MarketPage/MarketPage'

describe('MarketPage', () => {
    
    afterEach(cleanup)

    it('should render', () => {
      render(<MarketPage/>)
    });

    it('should render title', () => {
        render(<MarketPage/>)
        expect(screen.getByText(MarketName).tagName).toBe("H1")
    });

    it('should render textbox to search', () => {
        render(<MarketPage/>)
        screen.getByRole("textbox")
    });

    it('should render textbox a button to search', () => {
        render(<MarketPage/>)
        expect(screen.getByRole("button")).toHaveTextContent("Buscar")
    });

    it('should render name of each popularCryptocurrencies', () => {
        render(<MarketPage />);
        popularCryptocurrencies.forEach(cryto => {
            screen.getByText(cryto)
        })
    });

    it('should render price of each popularCryptocurrencies', () => {
        render(<MarketPage />);
        popularCryptocurrencies.forEach(cryto => {
            expect(document.querySelector(`#${cryto}Price`).firstChild.textContent).toBe(String(popularCryptocurrenciesPrices[cryto]));
        })
    });

    it('should render graph of each popularCryptocurrencies', () => {
        render(<MarketPage />);
        popularCryptocurrencies.forEach(cryto => {
            expect(document.querySelector(`#${cryto}Graph`)).toBeInTheDocument()
        })
    });
})