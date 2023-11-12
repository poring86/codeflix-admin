import { rest } from "msw"
import { baseUrl } from "../api/apiSlice"
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils"
import { CreateCategory } from "./CreateCategory"
import { setupServer } from "msw/lib/node"


export const handlers = [
  rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(ctx.delay(150), ctx.status(201))
  })
]

const server = setupServer(...handlers)

describe("CreateCategory", () => {
  afterAll(() => server.close())
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<CreateCategory />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should  handle submit', async () => {
    renderWithProviders(<CreateCategory />)
    const name = screen.getByTestId('name')
    const description = screen.getByTestId('description')
    const isActive = screen.getByTestId('is_active')
    const submit = screen.getByText('Save')

    fireEvent.change(name, { target: { value: 'test' } })
    fireEvent.change(description, { target: { value: 'test desc' } })

    fireEvent.click(isActive)
    fireEvent.click(submit)

    await waitFor(() => {
      const text = screen.getByText('Category created successfully!')
      expect(text).toBeInTheDocument()
    })
  })
})