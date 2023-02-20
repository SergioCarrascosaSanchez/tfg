import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import { options, appName } from "../../src/components/Navbar/Navbar";
import { StudentPage, StudentPageError } from "../../src/pages/StudentPage/StudentPage";

const studentName = "Sergio";

describe("StudentPage error", () => {
  vi.mock("react-router-dom", () => {
    const useParams = vi.fn();
    const studentName = "Sergio";
    useParams.mockReturnValue({
      student: studentName,
    });
    return {
      useParams,
    };
  });

  vi.mock("../../src/hooks/useGetUserData", () => {
    const useGetUserData = vi.fn();
    useGetUserData.mockReturnValue({
      loading: false,
      error: true,
      statusCode: 400,
      data: [],
    });
    return {
      useGetUserData,
    };
  });

  afterEach(cleanup);

  it("should render coin name, coin image and spinner", () => {
    render(<StudentPage />);
    screen.getByText(studentName); 
    screen.getByText(StudentPageError); 
  });

  it("should render navbar elements", () => {
    render(<StudentPage />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });
});