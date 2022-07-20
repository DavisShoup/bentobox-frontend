import { Link, useParams } from 'react-router-dom';
import LoadingIcon from '../components/LoadingIcon';
import { useQuery } from '@apollo/client';
import { GET_RECIPE } from '../queries/recipeQueries';
import ChefInfo from '../components/ChefInfo';
import DeleteRecipeButton from '../components/DeleteRecipeButton';
import EditRecipeForm from '../components/EditRecipeForm'

export default function Recipe() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_RECIPE,
        { variables: { id } });

        if (loading) return <LoadingIcon />;
        if (error) return <p>Error!</p>

    return (
        <>
        {!loading && !error && (
            <div className="mx-auto w-75 card p-5">
                <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
                    Back
                </Link>

                <h1>{data.recipe.name}</h1>
                <p>{data.recipe.steps}</p>
                <h5 className="mt-3">Cook Time</h5>
                <p className="lead">{data.recipe.time}</p>

                <ChefInfo chef={data.recipe.chef} />

                <EditRecipeForm recipe={data.recipe} />

                <DeleteRecipeButton recipeId={data.recipe.id} />
            </div>
        )}
        </>
  )
}
