type Profile = {
  name: string;
  description: string;
};
export default {
  Query: {
    getProfile: (): Profile => {
      return { name: 'swlee', description: 'test' };
    },
  },
};
