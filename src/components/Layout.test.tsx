import { Layout } from "./Layout"
import { renderWithProviders } from "../utils/test-utils";

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
})