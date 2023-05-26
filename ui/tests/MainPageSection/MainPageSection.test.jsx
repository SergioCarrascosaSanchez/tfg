import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { MainPageSection } from "../../src/components/MainPageSection/MainPageSection";

describe("MainPageSection", () => {
  afterEach(cleanup);

  it("should render message with form prop", () => {
    render(<MainPageSection title={"Title"} text={"Text"} alt={"AltText"} />);
    screen.getByText("Title");
    screen.getByText("Text");
    screen.getByAltText("AltText");
  });
});