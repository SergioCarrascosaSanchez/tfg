import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest"
import { Navbar, options, appName } from '../src/components/Navbar/Navbar'
import { MemoryRouter, Route } from 'react-router-dom'

describe('Navbar', () => {

  afterEach(cleanup)

  it('should render appName when location pathname is /', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/' }
    });
    render(<Navbar />);
    screen.getByTestId(`${appName}Navbar`);
    options.forEach((opt) => {
      expect(screen.queryAllByTestId(`${opt}Navbar`).length).toBe(0)
    })
  })

  it('should render appName and options when location pathname is /market', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/market' }
    });
    render(<Navbar />);
    screen.getByTestId(`${appName}Navbar`);
    options.forEach((opt) => {
      expect(screen.queryAllByTestId(`${opt}Navbar`).length).toBe(1)
    })
  })

  it('should render appName and options when location pathname is /users/UserTest', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/users/UserTest' }
    });
    render(<Navbar />);
    screen.getByTestId(`${appName}Navbar`);
    options.forEach((opt) => {
      expect(screen.queryAllByTestId(`${opt}Navbar`).length).toBe(1)
    })
  })

  it('should render appName and options when location pathname is /users/UserTest2', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/users/UserTest2' }
    });
    render(<Navbar />);
    screen.getByTestId(`${appName}Navbar`);
    options.forEach((opt) => {
      expect(screen.queryAllByTestId(`${opt}Navbar`).length).toBe(1)
    })
  })

  it('should render appName and options when location pathname is /coins/BTC', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/coins/BTC' }
    });
    render(<Navbar />);
    screen.getByTestId(`${appName}Navbar`);
    options.forEach((opt) => {
      expect(screen.queryAllByTestId(`${opt}Navbar`).length).toBe(1)
    })
  })

  it('should render appName and options when location pathname is /coins/ADA', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/coins/BTC' }
    });
    render(<Navbar />);
    screen.getByTestId(`${appName}Navbar`);
    options.forEach((opt) => {
      expect(screen.queryAllByTestId(`${opt}Navbar`).length).toBe(1)
    })
  })
});