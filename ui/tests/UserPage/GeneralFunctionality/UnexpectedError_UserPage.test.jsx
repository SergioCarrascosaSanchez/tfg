import { describe } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { UserPage, UnexpectedUserPageError } from "../../../src/pages/UserPage/UserPage";

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
    
      vi.mock("../../../src/hooks/useGetUserData", () => {
        const useGetUserData = vi.fn();
        useGetUserData.mockReturnValue({
          loading: false,
          error: false,
          statusCode: 200,
          data: {
            username:"Sergio",
            role:"OTHER_ROLE",
            balance: 1000.0,
            portfolio: [
              {
                coin: "BTC",
                quantity: 10,
              },
              {
                coin: "ETH",
                quantity: 2,
              },
            ],
          },
        });
        return {
          useGetUserData,
        };
      });
    
      afterEach(cleanup);
    
      it("should render error", () => {
        render(<UserPage />);
        screen.getByText(username);
        screen.getByText(UnexpectedUserPageError);
      });
})