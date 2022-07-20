import { gql } from '@apollo/client';

const GET_CHEFS = gql`
  query getChefs {
    chefs{
      id
      name
      email
    }
  }
`

export { GET_CHEFS }
