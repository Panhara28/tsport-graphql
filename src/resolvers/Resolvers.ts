const AppResolver = [
  {
    Query: {
      testing: () => {
        return 'Hello World';
      },
    },

    Mutation: {
      testing: () => {
        return true;
      },
    },
  },
];

export default AppResolver;
