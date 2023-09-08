import { fireEvent, render } from "@testing-library/react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import ResultsScreen from "../../app/results";
import { getRandomElements } from "../../utils/getRandomElements";

import { MESSAGES } from "../../constants/messages";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

jest.mock("../../utils/getRandomElements", () => ({
  getRandomElements: jest.fn(),
}));

describe("ResultsScreen", () => {
  beforeEach(() => {
    getRandomElements.mockReturnValueOnce([
      MESSAGES.PREDICTION_SUCCESS_MESSAGE[0],
    ]);
    useLocalSearchParams.mockReturnValue({ result: "success" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all elements correctly", () => {
    const { getByTestId } = render(<ResultsScreen />);

    const image = getByTestId("bot-image");

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(require("../../assets/bot.png"));
  });

  it("should display the success prediction message correctly", () => {
    const { getByText } = render(<ResultsScreen />);
    expect(
      getByText("Awesome! \n Anything else you're trying to recall?")
    ).toBeTruthy();
  });

  it("should navigate to /predictions when the microphone icon is pressed", () => {
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    const { getByTestId } = render(<ResultsScreen />);

    const icon = getByTestId("mic-icon");

    fireEvent.press(icon);
    expect(mockPush).toHaveBeenCalledWith("/predictions");
  });
});
