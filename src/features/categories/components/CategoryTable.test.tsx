import { render } from "@testing-library/react";
import { CategoriesTable } from "./CategoryTable";
import { BrowserRouter } from "react-router-dom";

const Props = {
  data: undefined,
  perPage: 15,
  isFetching: false,
  rowsPerPage: [15, 25, 50],
  handleOnPageChange: () => { },
  handleFilterChange: () => { },
  handleOnPageSizeChange: () => { },
  handleDelete: () => { },
};

const mockData = {
  data: [
    {
      id: "123",
      name: "test",
      description: "test",
      is_active: true,
      created_at: "2021-03-01T00:00:00.000000Z",
      updated_at: "2021-03-01T00:00:00.000000Z",
      deleted_at: "",
    },
  ],
  meta: {
    to: 1,
    from: 1,
    path: "http://localhost:8000/api/categories",
    total: 1,
    per_page: 1,
    last_page: 1,
    current_page: 1,
  },
  links: {
    first: "http://localhost:8000/api/cast_members?page=1",
    last: "http://localhost:8000/api/cast_members?page=1",
    prev: "",
    next: "",
  },
};

describe("Category table", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<CategoriesTable {...Props} />, {
      wrapper: BrowserRouter,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CastMembersTable with loading", () => {
    const { asFragment } = render(<CategoriesTable {...Props} isFetching />, {
      wrapper: BrowserRouter,
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with data", () => {
    const { asFragment } = render(
      <CategoriesTable {...Props} data={mockData} />,
      { wrapper: BrowserRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render CategoryTable with Inactive value", () => {
    const { asFragment } = render(
      <CategoriesTable
        {...Props}
        data={{
          ...mockData,
          data: [{ ...mockData.data[0], is_active: false }],
        }}
      />,
      { wrapper: BrowserRouter }
    );
    expect(asFragment()).toMatchSnapshot();
  });
})