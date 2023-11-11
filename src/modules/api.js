const makeRequest = async ({ url, method, body }) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await response.json();
  if (!data.data) {
    const error =
      `${data.error.status} | ${data.error.message}` ?? "Something went wrong!";
    throw new Error(error);
  }
  return data;
};

const defaultURL = "https://api.staging.sumize.io/api/todos";

export const Api = {
  get: (url = "") => makeRequest({ url: `${defaultURL}${url}`, method: "GET" }),
  post: (body) =>
    makeRequest({ url: defaultURL, method: "POST", body: { data: body } }),
  patch: (id, body) =>
    makeRequest({
      url: `${defaultURL}/${id}`,
      method: "PUT",
      body: { data: body },
    }),
  delete: (id) =>
    makeRequest({ url: `${defaultURL}/${id}`, method: "DELETE", body: {} }),
};
