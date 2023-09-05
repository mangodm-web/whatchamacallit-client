import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";

import IntroScreen from "../../app/intro";
import { getRandomElements } from "../../utils/getRandomElements";

import { MESSAGES } from "../../constants/messages";
import { SAMPLE_QUESTION_ANSWERS } from "../../constants/sampleQuestionAnswers";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../utils/getRandomElements", () => ({
  getRandomElements: jest.fn(),
}));

describe("IntroScreen", () => {
  beforeEach(() => {
    getRandomElements
      .mockReturnValueOnce([MESSAGES.WELCOME_MESSAGE[0]])
      .mockReturnValueOnce([SAMPLE_QUESTION_ANSWERS[0]]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render all elements correctly", () => {
    const { getByTestId } = render(<IntroScreen />);

    const image = getByTestId("bot-image");
    const icon = getByTestId("mic-icon");

    expect(image).toBeTruthy();
    expect(icon).toBeTruthy();
    expect(image.props.source).toEqual(require("../../assets/bot.png"));
  });

  it("should display a welcome message correctly", () => {
    const { getByText } = render(<IntroScreen />);
    expect(getByText("Hi, what's on your mind?")).toBeTruthy();
  });

  it("should display sample questions and answers correctly", () => {
    const { getByText } = render(<IntroScreen />);
    expect(
      getByText("A place in New York where lights and billboards everywhere...")
    ).toBeTruthy();
    expect(getByText("Times Square")).toBeTruthy();
  });

  it("should navigate to /predictions when the microphone icon is pressed", () => {
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({ push: mockPush }));

    const { getByTestId } = render(<IntroScreen />);

    const icon = getByTestId("mic-icon");

    fireEvent.press(icon);
    expect(mockPush).toHaveBeenCalledWith("/predictions");
  });
});
