import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client';
import { DELETE_CHEF } from '../mutations/chefMutations';
import { GET_CHEFS } from '../queries/chefQueries';
import { GET_RECIPES } from '../queries/recipeQueries';


export default function ChefRow( {chef} ) {
    const [deleteChef] = useMutation(DELETE_CHEF, {
        variables: { id: chef.id },
        refetchQueries: [{ query: GET_CHEFS }, { query: GET_RECIPES}],
        update(cache, { data: { deleteChef }}) { 
            const { chefs } = cache.readQuery({ query: GET_CHEFS });
            cache.writeQuery({
                query: GET_CHEFS,
                data: { chefs: chefs.filter(chef => chef.id !== deleteChef.id)},
            });
         }
    });
    return (
    <tr>
        <td>{ chef.name }</td>
        <td>{ chef.email }</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={deleteChef}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
