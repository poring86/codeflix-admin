import { rest } from 'msw'
import { setupServer } from "msw/node";
import { ListCategory } from './ListCategory'
import { baseUrl } from '../api/apiSlice'
import { renderWithProviders, screen } from '../../utils/test-utils'
import { categoryResponse } from '../../mocks'

export const handlers = [
  rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
    return res(ctx.json(categoryResponse), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

describe("Category List", () => {
  afterAll(() => server.close())
  afterAll(() => server.listen())
  afterAll(() => server.resetHandlers())

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCategory />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading state", () => {
    renderWithProviders(<ListCategory />)
    const loading = screen.getByRole("progressbar")
    expect(loading).toBeInTheDocument()
  })
})