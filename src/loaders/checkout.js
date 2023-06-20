import { useDispatch } from "react-redux";

export const checkoutLoader = async ({params}) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/orders/success/${params.sessionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //can add public key here to improve security
      // body: JSON.stringify(),
    }
  );
  const data = await response.json();
  return data;
};
