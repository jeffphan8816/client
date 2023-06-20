export const rootLoader = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/items?populate=image`,
    { method: "GET" }
  );
  const data = await response.json();
  // console.log("🚀 ~ file: root.js:9 ~ rootLoader ~ data:", data);
  return data.data;
};
