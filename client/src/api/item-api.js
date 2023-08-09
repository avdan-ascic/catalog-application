import axios from "axios";

import baseUrl from "../config";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const create = async (item) => {
  try {
    const response = await axios.post(`${baseUrl.server}/api/items/add`, item, {
      "Content-Type": "multipart/form-data",
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readById = async (id) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/items/readById`,
      id,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readByCategory = async (cat) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/items/readByCat`,
      cat,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const readAllItems = async () => {
  try {
    const response = await axios.get(`${baseUrl.server}/api/items/readAll`, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const update = async (item) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/items/update`,
      item,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.post(
      `${baseUrl.server}/api/items/delete`,
      id,
      { headers }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { create, readByCategory, readById, readAllItems, update, remove };
