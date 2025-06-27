export const authEndPoints = {
  // AUTH
  LOGIN: "/vendor/login",
  SIGNUP: "/auth/signup",
};

export const vendorEndPoints = {
  // VENDOR
  CREATE_INTERNAL_STORE: "/vendor/store/internal",
  UPDATE_STORE: "/vendor/store/editStore",
  GET_STORE_CATEGORIES: "/categories",
  CREATE_PRODUCT: "/vendor/store/product",
  UPDATE_PRODUCT: "/vendor/store/product/editproduct",
  DELETE_PRODUCT_IMG: "/vendor/store/product/deleteproductimage",
  UPDATE_PRODUCT_IMG: "/vendor/store/product/updateimage",
  GET_STORES: "/vendor/store",
  GET_STORE_PRODUCTS: "/vendor/store/products",
  GET_ORDERS: "/vendor/order/getorders",
  GET_ORDER_BY_ID: "/vendor/GetOrderById",
  GET_ORDER_TRANSACTION: "/vendor/getVendorTransactions",
  GET_STATMENT: "/vendor/getStatements",
  UPDATE_STATUS: "/vendor/order/updatestatus",
  GET_TAGS: "/getTags",
  VENDOR_DASHBOARD: "/vendor/dashboard/stats",
  GET_SINGLE_PRODUCT: "/vendor/product/getProductById",
  PAYMENT_DETAILS: "/vendor/getvendorearnings",
  SEND_MESSAGE: "/sendmessage",
  GET_MY_MESSAGES: "/getMyMessages",
  GET_MY_CHATROOMS: "/getMyChatRooms",
  PRODUCT_REVIEW: "/user/product/review",
  REPLY_PRODUCT_REVIEW: "/vendor/product/review/reply",
  GET_PRODUCT_REVIEWS: "/getProductReviews",
  DISABLE_PRODUCT: "/vendor/store/product/disableproduct",
  DELETE_REPLY_REVIEW: "/vendor/product/review/reply/delete",
  EDIT_REVIEW_REPLY: "/vendor/product/review/reply/edit",
  CHECK_MY_ACCOUNT: "/user/account/check",
  GENERATE_CONNECT_LINK: "/vendor/account/generate/link",
  VENDOR_CONNECT_CALLBACK: "/vendor/api/stripe/oauth/callback",
  WITHDRAW: "/vendor/wallet/withdraw",
  GET_WALLET: "/vendor/wallet/get",
  GET_NOTIFICATIONS: "/user/notification/get",
  MARK_NOTIFICATION_AS_READ: "/user/notification/mark-read",
};

export const publicEndPoints = {
  // PUBLIC
  GET_CATEGORIES: "/categories",
  GET_TAGS: "/getTags",
  GET_PRODUCT_BY_ID: "/getProductById",
};

export const affiliateEndPoints = {
  // AFFILIATE
  GET_SUBSCRIPTIONS: "/vendor/subscription/get",
  SUBSCRIBE: "/vendor/affiliate/subscribe",
  CREATE_AFFILIATE_ALL_PRODUCT: "/vendor/affiliate/program/all/create",
  DELETE_AFFILIATE_PROGRAM: "/vendor/affiliate/program/delete",
  CREATE_AFFILIATE_SPECIFIC_PRODUCT: "vendor/affiliate/program/specific/create",
  GET_AFFILIATE_ALL_PRODUCTS: "/vendor/affiliate/program/all/get",
  GET_AFFILIATE_SPECIFIC_PRODUCTS: "/vendor/affiliate/program/specific/get",
};

export type endPointsTypes =
  | keyof typeof authEndPoints
  | keyof typeof vendorEndPoints
  | keyof typeof affiliateEndPoints;
