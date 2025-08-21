// "use client";
// import { productsDummyData, userDummyData } from "@/assets/assets";
// import { useAuth, useUser } from "@clerk/nextjs";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export const AppContext = createContext();

// export const useAppContext = () => {
//   return useContext(AppContext);
// };

// export const AppContextProvider = (props) => {
//   const currency = process.env.NEXT_PUBLIC_CURRENCY;
//   const router = useRouter();
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const [products, setProducts] = useState([]);
//   const [userData, setUserData] = useState(false);
//   const [isSeller, setIsSeller] = useState(false);
//   const [cartItems, setCartItems] = useState({});

//   const fetchProductData = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success) {
//         setProducts(data.products);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const fetchUserData = async () => {
//     try {
//       if (user.publicMetadata.role === "seller") {
//         setIsSeller(true);
//       }

//       const token = await getToken();

//       // Here calling API

//       const { data } = await axios.get("/api/user/data", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Now we will get response in data variable

//       if (data.success) {
//         setUserData(data.user);
//         setCartItems(data.user.cartItems);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const addToCart = async (itemId) => {
//     let cartData = structuredClone(cartItems);
//     if (cartData[itemId]) {
//       cartData[itemId] += 1;
//     } else {
//       cartData[itemId] = 1;
//     }
//     setCartItems(cartData);

//     if (user) {
//       try {
//         const token = await getToken();
//         await axios.post(
//           "/api/cart/update",
//           { cartData },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         toast.success("Item added to cart successfully.");
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   const updateCartQuantity = async (itemId, quantity) => {
//     let cartData = structuredClone(cartItems);
//     if (quantity === 0) {
//       delete cartData[itemId];
//     } else {
//       cartData[itemId] = quantity;
//     }
//     setCartItems(cartData);

//     if (user) {
//       try {
//         const token = await getToken();
//         await axios.post(
//           "/api/cart/update",
//           { cartData },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         toast.success("Cart updated successfully.");
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//   };

//   const getCartCount = () => {
//     let totalCount = 0;
//     for (const items in cartItems) {
//       if (cartItems[items] > 0) {
//         totalCount += cartItems[items];
//       }
//     }
//     return totalCount;
//   };

//   const getCartAmount = () => {
//     let totalAmount = 0;
//     for (const items in cartItems) {
//       let itemInfo = products.find((product) => product._id === items);
//       if (cartItems[items] > 0) {
//         totalAmount += itemInfo.offerPrice * cartItems[items];
//       }
//     }
//     return Math.floor(totalAmount * 100) / 100;
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchUserData();
//     }
//   }, [user]);

//   const value = {
//     user,
//     getToken,
//     currency,
//     router,
//     isSeller,
//     setIsSeller,
//     userData,
//     fetchUserData,
//     products,
//     fetchProductData,
//     cartItems,
//     setCartItems,
//     addToCart,
//     updateCartQuantity,
//     getCartCount,
//     getCartAmount,
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };

/* -------- Updated App Context ----------- */

"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  const { user } = useUser();
  const { signOut, getToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [ratings, setRatings] = useState({}); // ⭐ store ratings here

  // -------------------
  // Fetch Products
  // -------------------
  const fetchProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);

        // initialize ratings from products if they have default rating
        const initialRatings = {};
        data.products.forEach((p) => {
          initialRatings[p._id] = p.rating || 0;
        });
        setRatings(initialRatings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // -------------------
  // Fetch User Data
  // -------------------
  const fetchUserData = async () => {
    try {
      if (user.publicMetadata.role === "seller") {
        setIsSeller(true);
      }

      const token = await getToken();
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // -------------------
  // Cart Functions
  // -------------------
  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);

    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item added to cart successfully.");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/cart/update",
          { cartData },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Cart updated successfully.");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0 && itemInfo) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // -------------------
  // Ratings Functions
  // -------------------
  const updateRating = async (productId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [productId]: rating,
    }));

    // (optional) Persist rating to backend
    if (user) {
      try {
        const token = await getToken();
        await axios.post(
          "/api/product/rate",
          { productId, rating },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Thanks for rating!");
      } catch (error) {
        toast.error("Failed to update rating: " + error.message);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(); // Clerk logout
      router.push("/"); // redirect to login page
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  // -------------------
  // Effects
  // -------------------
  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  // -------------------
  // Context Value
  // -------------------
  const value = {
    user,
    getToken,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    ratings,
    updateRating,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
