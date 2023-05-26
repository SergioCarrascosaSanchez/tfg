import { afterEach, describe, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { UserAvatar } from "../../src/components/UserAvatar/UserAvatar";

describe("UserAvatar", () => {

    afterEach(cleanup)

    it("should render user avatar testid and first Letter of UserTest1", () => {
        render(<UserAvatar username="UserTest1"/>)
        screen.getByTestId("UserTest1Avatar")
        screen.getByText("U")
    })

    it("should render user avatar testid and first Letter of ExampleUser", () => {
        render(<UserAvatar username="ExampleUser"/>)
        screen.getByTestId("ExampleUserAvatar")
        screen.getByText("E")
    })

    it("should render user avatar testid and first Letter of DumbExample", () => {
        render(<UserAvatar username="DumbExample"/>)
        screen.getByTestId("DumbExampleAvatar")
        screen.getByText("D")
    })
})