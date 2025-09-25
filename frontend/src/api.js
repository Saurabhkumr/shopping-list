const API_URL = import.meta.env.VITE_API_URL;

export const getItems = async () => (await fetch(API_URL)).json();

export const addItem = async (item) => {
  return (
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
  ).json();
};

export const updateItem = async (id, updates) => {
  return (
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
  ).json();
};

export const deleteItem = async (id) => {
  return (await fetch(`${API_URL}/${id}`, { method: "DELETE" })).json();
};
