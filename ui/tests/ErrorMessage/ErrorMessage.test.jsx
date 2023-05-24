import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import { ErrorMessage } from "../../src/components/ErrorMessage/ErrorMessage";

describe("ErrorMessage", () => {
  afterEach(cleanup);

  it("should render message with form prop", () => {
    render(<ErrorMessage form={true} message={"Test"} />);
    screen.getByText("Test");
  });
  it("should render message without form prop", () => {
    render(<ErrorMessage message={"Test"} />);
    screen.getByText("Test");
  });
  it("should render message with center prop", () => {
    render(<ErrorMessage message={"Test"} center={"true"} />);
    screen.getByText("Test");
  });
});
