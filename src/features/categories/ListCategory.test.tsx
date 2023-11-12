import { rest } from 'msw'
import { setupServer } from "msw/node";
import { ListCategory } from './ListCategory'
import { baseUrl } from '../api/apiSlice'
import { renderWithProviders, screen, waitFor } from '../../utils/test-utils'
import { categoryResponse } from '../../mocks'

export const handlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    if (req.url.searchParams.get('page') === '2') {
      return res(ctx.json(categoryResponse), ctx.delay(150))
    }

    return res(ctx.json(categoryResponse), ctx.delay(150))
  }),

  rest.delete(
    `${baseUrl}/categories/9757b801-e049-45b8-99bb-49cff1ea0e7e`,
    (_, res, ctx) => {
      return res(ctx.delay(150), ctx.status(204))
    },
  ),
]

const server = setupServer(...handlers)

describe("Category List", () => {
  afterAll(() => server.close());
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());

  it("should render correctly", () => {
    const { asFragment } = renderWithProviders(<ListCategory />)
    expect(asFragment()).toMatchSnapshot()
  })

  it("should render loading state", () => {
    renderWithProviders(<ListCategory />)
    const loading = screen.getByRole("progressbar")
    expect(loading).toBeInTheDocument()
  })

  it('should render success state', async () => {
    renderWithProviders(<ListCategory />)

    await waitFor(() => {
      const name = screen.getByText('Violet')
      expect(name).toBeInTheDocument()
    })
  })

  it("should render error state", async () => {
    server.use(
      rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    renderWithProviders(<ListCategory />);

    await waitFor(() => {
      const error = screen.getByText("Error fetching categories");
      expect(error).toBeInTheDocument();
    });
  });
})