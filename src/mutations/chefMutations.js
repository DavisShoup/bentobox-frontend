import { gql } from '@apollo/client';

const ADD_CHEF = gql`
    mutation addChef($name: String!, $email: String!) {
        addChef(name: $name, email: $email)
        {
            id
            name
            email
        }
    }
`

const DELETE_CHEF = gql`
    mutation deleteChef($id: ID!) {
        deleteChef(id: $id){
            id
            name
            email
        }
    }
`;

export { ADD_CHEF, DELETE_CHEF };