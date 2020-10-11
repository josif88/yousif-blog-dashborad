// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const url = "https://mashriq.herokuapp.com/dash/v1/";

export const login = (data, cp) => {
  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => cp(null, result))
    .catch((e) => cp(e, null));
};

export const register = (data, cp) => {
  fetch(`${url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => cp(null, result))
    .catch((e) => cp(e, null));
};

export const addArticle = (data, cp) => {
  fetch(`${url}/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("user_token"),
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => cp(null, result))
    .catch((e) => cp(e, null));
};

export const getArticles = (cp) => {
  fetch(`${url}/articles`, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("user_token"),
    },
  })
    .then((resp) => resp.json())
    .then((result) => cp(result));
};

export const getArticle = (id, cp) => {
  fetch(`${url}/article/${id}`, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("user_token"),
    },
  })
    .then((resp) => resp.json())
    .then((result) => cp(null, result))
    .catch((err) => cp(err, null));
};

export const editArticle = (id, data, cp) => {
  fetch(`${url}/article/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("user_token"),
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => cp(null, result))
    .catch((err) => cp(err, null));
};
