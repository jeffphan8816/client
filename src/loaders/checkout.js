export const checkoutLoader = async ({params}) => {
  const response = await fetch(
    `http://localhost:1338/api/orders/success/${params.sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    }
  );
  
  const data = await response.json();
  // console.log("🚀 ~ file: root.js:9 ~ rootLoader ~ data:", data);
  return data;
};
