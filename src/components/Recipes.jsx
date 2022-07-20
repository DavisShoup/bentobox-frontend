import LoadingIcon from "./LoadingIcon"
import { useQuery } from '@apollo/client'
import RecipeCard from "./RecipeCard"
import { GET_RECIPES } from "../queries/recipeQueries"



export default function Recipes() {
    const {loading, error, data } = useQuery(GET_RECIPES);

    if (loading) return <LoadingIcon />;
    if (error) return <p>Error!</p>
    return (
    <>
        { data.recipes.length > 0 ? (
            <div className="row mt-4">
                {data.recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        ) : (
            <p>No Recipes</p>
        )}
    </>
  )
}
