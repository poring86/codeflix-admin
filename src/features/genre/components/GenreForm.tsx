import { Category } from "../../../types/Category"

type Props = {
  genre: any
  categories?: Category[]
  isLoading?: boolean
  isDisabled?: boolean
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLFormElement>) => void
}

export function GenreForm({
  genre,
  categories,
  isDisabled = false,
  isLoading = false,
  handleSubmit,
  handleChange
}: Props) {
  return (
    <div>GenreForm</div>
  )
}
