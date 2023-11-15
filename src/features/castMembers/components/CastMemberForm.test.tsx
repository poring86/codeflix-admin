import { render } from "@testing-library/react"
import { CastMembersForm } from "./CastMembersForm"
import { BrowserRouter } from "react-router-dom"

const Props = {
  castMember: {
    id: "i",
    name: "test",
    type: 1,
    deleted_at: null,
    created_at: "2023-11-09T15:48:31+0000Z",
    updated_at: "2023-11-09T15:48:31+0000Z",
  },
  isDisabled: false,
  isLoading: false,
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
}

describe("CastMemberForm", () => {
  it("should render castMember form correcty", () => {
    const { asFragment } = render(<CastMembersForm  {...Props} />, {
      wrapper: BrowserRouter
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render castmember form with loading state", () => {
    const { asFragment } = render(<CastMembersForm {...Props} isLoading />, {
      wrapper: BrowserRouter
    })
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render castmember form with disabled state", () => {
    const { asFragment } = render(<CastMembersForm {...Props} isLoading={true} isDisabled={true} />, {
      wrapper: BrowserRouter
    })

    expect(asFragment()).toMatchSnapshot()
  })
})