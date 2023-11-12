import { render } from "@testing-library/react"
import { Header } from "./Header"

describe("Header", () => {
  test("should render header", () => {
    const { asFragment } = render(<Header />)

    expect(asFragment()).toMatchSnapshot()
  })
})