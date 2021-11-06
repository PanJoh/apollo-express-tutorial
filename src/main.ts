import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import fs from 'fs';

const app = express();

import schema from './schema';
import { resolvers } from './resolvers';
import { MessageModels, Models, UserModels } from './models';
import ResolverContext from './resolvers/context';

const users: UserModels = {
    '1': {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        messageIds: [],
    },

    '2': {
        id: '2',
        firstName: 'John Stuard',
        lastName: 'Mill',
        messageIds: [],
    },
};

const messages: MessageModels = {
}

const models: Models = {
    users,
    messages: {},
};


const resolverContext: ResolverContext = {
    models,
    me: users[1],
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync("gql/schema/schema.gql", 'utf-8'),
    resolvers: resolvers,
    context: resolverContext,
});

async function main() {
    await server.start();

    server.applyMiddleware({ app, path: '/graphql'});

    const port = process.env.PORT || 3000;
    
    app.listen(port, () => 
        console.log(`Apollo Server listening http://localhost:${port}/grapql`)
    );
}

main()
.catch(err => console.error(err));

