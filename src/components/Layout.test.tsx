import { render } from "@testing-library/react"
import Layout from "./Layout"

describe("Header", () => {
  test("should render header", () => {
    const { asFragment } = render(
      <Layout>
        test
      </Layout>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})