import { createYoga, createSchema } from 'graphql-yoga'
import { personStore, PersonStore } from '@/lib/personStore'

const typeDefs = `
  type Person {
    id: String
    name: String
    birthdate: String
    title: String
    license: Boolean
  }
  type Query {
    persons: [Person!]!
  }
  type Mutation {
    createRandomPerson: Person!
    removePerson(personId: String!): String!
    removeAllPersons: [Person!]!
  }
`

const resolvers = {
  Query: {
    persons(_, __, { personStore }: Context) {
      return personStore.persons
    },
  },
  Mutation: {
    createRandomPerson(_, __, { personStore }: Context) {
      return personStore.createRandomPerson()
    },
    removePerson(
      _,
      { personId }: { personId: string },
      { personStore }: Context
    ) {
      return personStore.removePerson(personId)
    },
    removeAllPersons(_, __, { personStore }: Context) {
      return personStore.removeAllPersons()
    },
  },
}

const schema = createSchema({
  typeDefs,
  resolvers,
})

type Context = {
  personStore: PersonStore
}

const context: Context = {
  personStore,
}

export default createYoga({
  graphqlEndpoint: '/api/graphql',
  schema,
  context,
})
