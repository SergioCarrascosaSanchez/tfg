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

    it('should render LoginPage after clicking the login button', () => {
        render(<MainPage/>)
        expect(screen.getAllByText("Iniciar sesión").length).toBe(1)
        expect(screen.queryByText("Usuario")).toBeNull()
        expect(screen.queryByRole("textbox")).toBeNull()
        expect(screen.queryByText("Contraseña")).toBeNull()
        expect(screen.queryByRole('password')).toBeNull()

        fireEvent.click(screen.getByText("Iniciar sesión"))
        
        expect(screen.getAllByText("Iniciar sesión").length).toBe(3)
        expect(screen.getByRole("button")).toHaveTextContent("Iniciar sesión")
        expect(screen.getByRole("heading").tagName).toBe("H2") 
        expect(screen.getByRole("heading")).toHaveTextContent("Iniciar sesión")
        expect(screen.getByText("Usuario"))
        expect(screen.getByRole("textbox"))
        expect(screen.getByText("Contraseña"))
        expect(screen.getByRole('password'))
    })

    it('should render loading button at LoginPage after clicking submit', () => {
        render(<MainPage/>)

        fireEvent.click(screen.getByText("Iniciar sesión"))
        
        expect(screen.getByRole("button")).toHaveTextContent("Iniciar sesión")

        fireEvent.click(screen.getByRole("button"))

        expect(screen.getByRole("button")).toHaveTextContent("")
    })
})