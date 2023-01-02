import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import { describe, it } from "vitest"
import { options, appName } from "../src/components/Navbar/Navbar"
import { MainPage, altMainPageImage, textMainPage, mainPageTitle} from '../src/pages/MainPage/MainPage'

describe('MainPage', () => {

    afterEach(cleanup)

    it('should render', () => {
        render(<MainPage/>)
    })

    it('should render navbar elements', () => {
        render(<MainPage/>)
        options.forEach(option => screen.getByText(option))
        expect(screen.getByText(appName).tagName).toBe("H6")
    })

    it('should display main page title', () => {
        render(<MainPage/>)
        expect(screen.getByText(mainPageTitle).tagName).toBe("H1")
    })

    it('should display image with alt text', () => {
        render(<MainPage/>)
        screen.getAllByAltText(altMainPageImage)
    })

    it('should display main page paragraph', () => {
        render(<MainPage/>)
        screen.getAllByText(textMainPage);
    })

    it('should display a button for login', () => {
        render(<MainPage/>)
        expect(screen.getByText("Iniciar sesión").tagName).toBe("BUTTON")
    })
})