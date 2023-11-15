import { rest } from "msw"
import { baseUrl } from "../api/apiSlice"
import { setupServer } from "msw/lib/node"
import { castMembersApiSlice } from "./castMembersSlice"
import { ListCastMembers } from "./ListCastMembers"
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils"

import { castMembersResultPage1, castMembersResultPage2 } from './mocks'

export const handlers = [
  rest.get(`${baseUrl}/cast_members`, (req, res, ctx) => {
    if (req.url.searchParams.get('page') === '2') {
      return res(
        ctx.delay(150),
        ctx.status(200),
        ctx.json(castMembersResultPage2),
      )
    }

    return res(
      ctx.delay(150),
      ctx.status(200),
      ctx.json(castMembersResultPage1),
    )
  }),

  rest.delete(
    `${baseUrl}/cast_members/19c27aa1-c500-4290-a121-ad0c64fb3717`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204))
    },
  ),
]

const server = setupServer(...handlers)
describe("ListCastMembers", () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCastMembers />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading state", () => {
    renderWithProviders(<ListCastMembers />)
    const loading = screen.getByRole("progressbar")
    expect(loading).toBeInTheDocument()
  })

  it('should render success state', async () => {
    renderWithProviders(<ListCastMembers />)

    await waitFor(() => {
      const name = screen.getByText('Klocko')
      expect(name).toBeInTheDocument()
    })
  })

  it('should render error state', async () => {
    server.use(
      rest.get(`${baseUrl}/cast_members`, (_, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

    renderWithProviders(<ListCastMembers />)
    await waitFor(() => {
      const error = screen.getByText('Error fetching cast members!')
      expect(error).toBeInTheDocument()
    })
  })

  it("should handle on page change", async () => {
    renderWithProviders(<ListCastMembers />)
    await waitFor(() => {
      const name = screen.getByText('Klocko')
      expect(name).toBeInTheDocument()
    })

    const nextButton = screen.getByTestId('KeyboardArrowRightIcon')
    fireEvent.click(nextButton)
    await waitFor(() => {
      const name = screen.getByText('Bartoletti')
      expect(name).toBeInTheDocument()
    })
  })

  it('should handle filter change', async () => {
    renderWithProviders(<ListCastMembers />)

    await waitFor(() => {
      const name = screen.getByText('Klocko')
      expect(name).toBeInTheDocument()
    })

    const input = screen.getByPlaceholderText('Search…')
    fireEvent.change(input, { target: { value: 'Bartoletti' } })

    await waitFor(() => {
      const loading = screen.getByRole('progressbar')
      expect(loading).toBeInTheDocument()
    })
  })
})