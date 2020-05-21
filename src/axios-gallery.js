import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-gallery.firebaseio.com/",
});

export default instance;
