export const endPoints = {
  // AUTH
  LOGIN: "/user/login",
  SIGNUP: "/auth/signup",

  // VENDOR
  CREATE_INTERNAL_STORE: "/vendor/store/internal",
  GET_STORE_CATEGORIES: "/categories",
  CREATE_PRODUCT: "/vendor/store/product",
  GET_STORES: "/vendor/store",
  GET_STORE_PRODUCTS: "/vendor/store/products",
  GET_ORDERS: "/vendor/order/getorders",
  UPDATE_STATUS: "/vendor/order/updatestatus",
  GET_TAGS: "/getTags",

  // USER
  GET_USER_PRODUCTS: "/user/products",
  ADD_USER_CART: "/user/addtocart",
  GET_USER_CART: "/user/getcart",
  GET_PRODUCT_BY_ID: "/getProductById",
  PRODUCT_REVIEW: "/user/product/review",
  ORDER: "/user/order/product",
  CHECKOUT_CART: "/user/cart/checkoutcart",
  GET_MY_ORDERS: "/user/order/orders",
  GET_USER_PROFILE: "/user/profile/getAllDetails",
  UPDATE_PROFILE: "/user/profile/update",
  ADD_ADDRESS: "/user/profile/addAddress",
  ADD_PAYMENT_OPTION: "/user/profile/addPaymentOptions",
  DELETE_CART: "/user/deletecartitem",
};

export type endPointsTypes = keyof typeof endPoints;
