import { rest } from "msw"
import {
  fireEvent,
  renderWithProviders,
  waitFor,
  screen,
} from '../../utils/test-utils'
import { baseUrl } from "../api/apiSlice"
import { setupServer } from "msw/lib/node"
import { CreateCastMembers } from "./CreateCastMembers"


export const handlers = [
  rest.post(`${baseUrl}/cast_members`, (_, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201))
  }),
]

const server = setupServer(...handlers)

describe("CreateCastMember", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CreateCastMembers />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle submit', async () => {
    renderWithProviders(<CreateCastMembers />)
    const name = screen.getByTestId('name')
    const submit = screen.getByText('Save')

    fireEvent.change(name, { target: { value: 'type' } })
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Cast member created successfully!')
      expect(text).toBeInTheDocument()
    })
  })
})