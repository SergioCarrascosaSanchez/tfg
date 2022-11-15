import { describe, it, expect } from "vitest"
import { cleanup, render, screen } from "@testing-library/react";
import { MarketPage, MarketName, popularCryptocurrencies, popularCryptocurrenciesPrices } from '../src/pages/MarketPage/MarketPage'
import { options, appName } from "../src/components/Navbar/Navbar"

describe('MarketPage', () => {
    
    afterEach(cleanup)

    it('should render', () => {
      render(<MarketPage/>)
    });

    it('should render appName + options', () => {
        render(<MarketPage/>)
    
        screen.getByText(appName)
        expect(document.getElementById(`${appName}Navbar`).firstChild.textContent).toBe(appName);
        options.forEach(option => {
          expect(document.getElementById(`${option}Navbar`).firstChild.textContent).toBe(option);
        })
      })

    it('should render only one MarketName as h1 title', () => {
        render(<MarketPage/>)
        let h1MarketName
        screen.getAllByText(MarketName).forEach(element => {
            if((element.tagName === "H1")){
                if(h1MarketName === undefined){
                    h1MarketName = true
                }
                else{
                    h1MarketName = false
                }
            }
        })
        expect(h1MarketName).toBe(true)
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