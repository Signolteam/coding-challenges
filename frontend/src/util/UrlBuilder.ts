if (!process.env.REACT_APP_TASKS_API_BASE_URL) {
  console.error("env variable missing: REACT_APP_TASKS_API_BASE_URL");
}

const baseUrl = (process.env.REACT_APP_TASKS_API_BASE_URL as string).replace(
  /\/$/,
  ""
);
const UrlBuilder = {
  tasks: {
    getAll: () => `${baseUrl}/tasks`,
    getOne: (id: string) => `${baseUrl}/tasks/${id}`,
    postCreate: () => `${baseUrl}/tasks`,
    putUpdate: (id: string) => `${baseUrl}/tasks/${id}`,
  },
};
export default UrlBuilder;
