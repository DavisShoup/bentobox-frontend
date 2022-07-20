import { gql } from '@apollo/client';

const GET_RECIPES = gql`
    query getRecipes {
        recipes {
            id
            name
            time
        }
    }
`
const GET_RECIPE = gql`
    query getRecipe($id: ID!) {
        recipe(id: $id){
            id
            name
            steps
            time
            chef {
                id
                name
                email
            }
        }
    }
`


export { GET_RECIPES, GET_RECIPE }