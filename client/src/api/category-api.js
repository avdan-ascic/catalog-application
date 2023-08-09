import axios from "axios";

import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (category) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/categories/add`,
      category,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const read = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/categories/read`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, read };
