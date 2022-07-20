import { gql } from '@apollo/client';

const ADD_RECIPE = gql`
    mutation AddRecipe($name: String!, $steps: String!, $time: String!, $chefId: ID!){
        addRecipe(name: $name, steps: $steps, time: $time, chefId: $chefId){
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
`;

const DELETE_RECIPE = gql`
    mutation DeleteRecipe($id: ID!) {
        deleteRecipe(id: $id){
            id
        }
    }
`;

const UPDATE_RECIPE = gql`
    mutation UpdateRecipe($id: ID!, $name: String!, $steps: String!, $time: String!){
        updateRecipe(id: $id, name: $name, steps: $steps, time: $time){
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
`;

export { ADD_RECIPE, DELETE_RECIPE, UPDATE_RECIPE }