import axios from "axios";

const instance = axios.create({
  baseURL: "https://sample-gallery-67b54.firebaseio.com/",
});

export default instance;
