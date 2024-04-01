import axios from "axios";

const API = `https://api.github.com`;

const method = {
  getUser: (userName) => axios.get(API + `/users/${userName}`),
  getReposUser: (userName) =>
    axios
      .get(API + `/users/${userName}/repos?per_page=100`)
      .then(({ data }) => data),
};

export default method;
