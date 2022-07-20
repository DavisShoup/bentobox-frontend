import { useNavigate } from 'react-router-dom' // allows us to redirect to another page
import { FaTrash } from 'react-icons/fa';
import { GET_RECIPES } from '../queries/recipeQueries';
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../mutations/recipeMutations';

export default function DeleteRecipeButton({ recipeId }) {
    const navigate = useNavigate();
    const [deleteRecipe] = useMutation(DELETE_RECIPE, {
        variables: { id: recipeId },
        onCompleted: () => navigate('/'),
        refetchQueries: [{ query: GET_RECIPES }],
    });
    return (
    <div className='d-flex mt-5 ms-auto'>
        <button className="btn btn-danger m-2" onClick={deleteRecipe}>
            <FaTrash className='icon mb-1' />Delete Recipe
        </button>
    </div>
  )
}
