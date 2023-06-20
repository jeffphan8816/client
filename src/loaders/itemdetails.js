export const itemLoader = async ({params }) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/items/${params.itemId}?populate=image`,
      { method: "GET" }
    );
    const data = await response.json();
    // console.log("🚀 ~ file: index.jsx:29 ~ fetchItem ~ data:", data);
    return data.data;
  }
