import { describe, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import {
  TeacherPage,
  TeacherPageError,
} from "../../src/pages/TeacherPage/TeacherPage";
import { options, appName } from "../../src/components/Navbar/Navbar";

const teacherName = "Sergio";

describe("TeacherPage", () => {
  vi.mock("react-router-dom", () => {
    const useParams = vi.fn();
    const teacherName = "Sergio";
    useParams.mockReturnValue({
      teacher: teacherName,
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

  it("should render navbar", () => {
    render(<TeacherPage />);
    options.forEach((option) => screen.getByText(option));
    screen.getByText(appName);
  });

  it("should render error", () => {
    render(<TeacherPage />);
    screen.getByText(teacherName);
    screen.getByText(TeacherPageError);
  });
});