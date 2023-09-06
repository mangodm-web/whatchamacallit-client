import { render } from "@testing-library/react-native";

import Avatar from "../../components/Avatar";

describe("Avatar", () => {
  it("should render elements with default props when there is no prop given", () => {
    const { getByTestId } = render(<Avatar />);

    const image = getByTestId("avatar-image");

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(require("../../assets/bot.png"));
    expect(image.props.className).toEqual("w-32 h-32 mt-3");
  });

  it("should render elements with given props, if available", () => {
    const { getByTestId } = render(
      <Avatar
        imageSrc={require("../../assets/logo.png")}
        styles="w-40 h-40 mt-10"
      />
    );

    const image = getByTestId("avatar-image");

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual(require("../../assets/logo.png"));
    expect(image.props.className).toEqual("w-40 h-40 mt-10");
  });
});
