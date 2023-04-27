import { describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import {
  NotFoundPage,
  NotFoundPageText,
} from "../../src/pages/NotFoundPage/NotFoundPage";

describe("UserPage", () => {
  afterEach(cleanup);

  it("should render error", () => {
    render(<NotFoundPage />);
    screen.getByText(NotFoundPageText);
  });
});
