import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest"
import { Navbar, options, appName } from '../src/components/Navbar/Navbar'
import { MemoryRouter, Route } from 'react-router-dom'

describe('Navbar', () => {

  afterEach(cleanup)

  it('should render', () => {
    render(<Navbar/>)
  });

  it('should render appName + options', () => {
    render(<Navbar/>)

    screen.getByText(appName)
    expect(document.getElementById(`${appName}Navbar`).firstChild.textContent).toBe(appName);
    options.forEach(option => {
      expect(document.getElementById(`${option}Navbar`).firstChild.textContent).toBe(option);
    })
  })

  it('should render one row', () => {
    render(<Navbar/>)

    expect(screen.getAllByRole('list').length).toBe(1)
  })

  it('should render one column for title + one for each option', () => {
    render(<Navbar/>)

    expect(screen.getAllByRole('listitem').length).toBe(options.length + 1)
  })

  /*it('should render one column for title + one for each option', () => {
    let testHistory, testLocation;
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar/>
        <Route
        path="*"
        render={({ history, location }) => {
          testHistory = history;
          testLocation = location;
          return null;
        }}
      />
      </MemoryRouter>)

    expect(testLocation.pathname).toBe("/");
    expect(testLocation.pathname).toBe("/"+title);
  })*/

});