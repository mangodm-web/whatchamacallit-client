import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";

import WelcomeScreen from "../../app/index";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("WelcomeScreen", () => {
  it("should render all elements correctly", () => {
    const { getByText, getByTestId } = render(<WelcomeScreen />);

    expect(getByText("What")).toBeTruthy();
    expect(getByText("cha")).toBeTruthy();
    expect(getByText("A little helper that nudges lost words")).toBeTruthy();

    const image = getByTestId("logo-image");

    expect(image.props.source).toEqual(require("../../assets/logo.png"));
    expect(getByText("Getting Started")).toBeTruthy();
  });

  it("should navigate to /intro when 'Getting Started' is pressed", () => {
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    const { getByText } = render(<WelcomeScreen />);

    const button = getByText("Getting Started");
    fireEvent.press(button);

    expect(mockPush).toHaveBeenCalledWith("/intro");
  });
});
