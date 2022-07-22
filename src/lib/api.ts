import axios from "axios";
import { CreateObjectInterface } from "../interfaces/ObjectInterface";

export const GetObjects = () => {
  return axios({
    url: "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/",
  });
};

export const GetObjectById = (id: string) => {
  return axios.get(
    `https://62286b649fd6174ca82321f1.mockapi.io/case-study/products/${id}`
  );
};

export const CreateObject = (object: any) => {
  var formBody: any = [];
  for (var property in object) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(object[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return fetch(
    "https://62286b649fd6174ca82321f1.mockapi.io/case-study/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    }
  );
};

export const GetCategories = () => {
  return axios.get(
    "https://62286b649fd6174ca82321f1.mockapi.io/case-study/categories/"
  );
};
