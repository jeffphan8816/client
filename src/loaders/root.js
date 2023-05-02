export const rootLoader = async () => {
  const response = await fetch(
    "http://localhost:1338/api/items?populate=image",
    { method: "GET" }
  );
  const data = await response.json();
  // console.log("🚀 ~ file: root.js:9 ~ rootLoader ~ data:", data);
  return data.data;
};
