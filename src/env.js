export const ENV_CONSTANTS = {
  apiUrl:
    process.env.REACT_APP_HOST_TYPE !== "production"
      ? "http://localhost:8000/api"
      : "http://salty-coast-16931.herokuapp.com/api",
};
