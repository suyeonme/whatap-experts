import { gql } from 'apollo-server';

export default gql`
  type Profile {
    name: String
    description: String
  }
  type Query {
    getProfile: Profile!
  }

`;

