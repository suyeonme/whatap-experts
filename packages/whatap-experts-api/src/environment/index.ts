const defaultPort = 4000;

export interface Environment {
  apollo: {
    introspection: boolean;
  };
  port: number | string;
}

export const environment: Environment = {
  apollo: {
    introspection: process.env.APOLLO_INTROSPECTION !== 'false',
  },
  port: process.env.PORT || defaultPort,
};


