export default {
  jwt: {
    secret: process.env.SECRET as string,
    expiresIn: 7200,
  },
};
