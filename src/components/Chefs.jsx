import { useQuery } from "@apollo/client"
import ChefRow from './ChefRow'
import { GET_CHEFS } from "../queries/chefQueries"
import LoadingIcon from "./LoadingIcon"

export default function Chefs() {
  const { loading, error, data } = useQuery(GET_CHEFS)
  if (loading) return <LoadingIcon />
  if (error) return <p>Error!</p>
  return (
    <>
    {!loading && !error && (
      <table className='table table-hover bg-light mt-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.chefs.map(chef => (
            <ChefRow key={chef.id} chef={chef} />
          ))}
        </tbody>
      </table>
    )}
    </>
  )
}
