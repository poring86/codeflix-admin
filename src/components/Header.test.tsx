import { render } from "@testing-library/react"
import { Header } from "./Header"

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header toggle={() => { }} theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with light theme", () => {
    const { asFragment } = render(<Header toggle={() => { }} theme="light" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render correctly with dark theme", () => {
    const { asFragment } = render(<Header toggle={() => { }} theme="dark" />);
    expect(asFragment()).toMatchSnapshot();
  });
})