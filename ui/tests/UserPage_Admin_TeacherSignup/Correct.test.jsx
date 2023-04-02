import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, it } from "vitest";
import { UserPage } from "../../src/pages/UserPage/UserPage";
import {
  AdminDashboardSignupTeacherButtonText,
} from "../../src/components/AdminDashboard/AdminDashboard";
import { StudentSignupFormPlaceHolders, StudentSignupFormMessages } from "../../src/components/StudentSignupForm/StudentSignupForm";

describe("UserPage rendering AdminDashboard", () => {
  vi.mock("react-router-dom", async () => {
    return {
      ...vi.importMock("react-router-dom"),
      useParams: vi.fn().mockReturnValue({ user: "Sergio" }),
      Link: ({ children, to }) => <a href={to}>{children}</a>,
    };
  });

  vi.mock("../../src/hooks/useGetUserData", () => {
    const useGetUserData = vi.fn();
    useGetUserData.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      data: {
        username: "Sergio",
        role: "ADMIN",
      },
    });
    return {
      useGetUserData,
    };
  });

  vi.mock("../../src/hooks/useSignupUser", () => {
    const useSignupUser = vi.fn();
    useSignupUser.mockReturnValue({
      loading: false,
      error: false,
      statusCode: 200,
      signupUser : vi.fn()
    });
    return {
      useSignupUser,
    };
  });

  afterEach(cleanup);

  it("should message if correct operation", () => {
    render(<UserPage />);
    fireEvent.click(screen.getByText(AdminDashboardSignupTeacherButtonText));
    Object.values(TeacherSignupFormPlaceHolders).forEach((placeHolder) => {
      fireEvent.change(screen.getByPlaceholderText(placeHolder), {
        target: { value: "TestValues" },
      });
    });
    fireEvent.click(screen.getByText("Crear profesor"));
    screen.getByText(TeacherSignupFormMessages.correctOperation)
  });
});
