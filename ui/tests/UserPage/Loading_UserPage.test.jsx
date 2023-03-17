import { describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { options, appName } from "../../src/components/Navbar/Navbar";
import { UserPage, UserPageError } from "../../src/pages/UserPage/UserPage";

const username = "Sergio";

describe("UserPage", () => {
    vi.mock("react-router-dom", () => {
        const useParams = vi.fn();
        const username = "Sergio";
        useParams.mockReturnValue({
          user: username,
        });
        return {
          useParams,
        };
      });
    
      vi.mock("../../src/hooks/useGetUserData", () => {
        const useGetUserData = vi.fn();
        useGetUserData.mockReturnValue({
          loading: true,
          error: false,
          statusCode: null,
          data: [],
        });
        return {
          useGetUserData,
        };
      });
    
      afterEach(cleanup);
    
      it("should render navbar", () => {
        render(<UserPage />);
        options.forEach((option) => screen.getByText(option));
        screen.getByText(appName);
      });
    
      it("should render error", () => {
        render(<UserPage />);
        screen.getByText(username);
        screen.getByRole("progressbar");
      });
})