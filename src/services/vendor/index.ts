import {
  AddProductData,
  UpdateOrdersStatus,
  VendorStoreFormData,
} from "@/constants/Types";
import ApiHandler from "../index";
import { vendorEndPoints } from "../endpoints";
import { URL } from "url";

const createInternalStore = async (body: VendorStoreFormData) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.CREATE_INTERNAL_STORE,
      body
    );
    console.log("Create Internal Store Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Create Internal Store Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const editStore = async (body: VendorStoreFormData) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.UPDATE_STORE,
      body
    );
    console.log("Edit Store Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Edit Store Error:", error?.data.error || error.message);
    throw error;
  }
};

const getDashboard = async () => {
  try {
    const response = await ApiHandler().get(vendorEndPoints.VENDOR_DASHBOARD);
    console.log("get Dashboard Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Dashboard Error:", error?.data.error || error.message);
    throw error;
  }
};

const getStore = async () => {
  try {
    const response = await ApiHandler().get(vendorEndPoints.GET_STORES);
    console.log("get Store Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Store Error:", error?.data.error || error.message);
    throw error;
  }
};

const getStoresProducts = async (id: string) => {
  try {
    const response = await ApiHandler().get(
      `${vendorEndPoints.GET_STORE_PRODUCTS}?storeId=${id}`
    );
    console.log("get Products Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Products Error:", error?.data.error || error.message);
    throw error;
  }
};

const getSingleProduct = async (productId: string) => {
  try {
    const response = await ApiHandler().get(
      `${vendorEndPoints.GET_SINGLE_PRODUCT}?product_id=${productId}`
    );
    console.log("get single Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "get single Products Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const getOrders = async () => {
  try {
    const response = await ApiHandler().post(vendorEndPoints.GET_ORDERS);
    console.log("get Orders Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Orders Error:", error?.data.error || error.message);
    throw error;
  }
};

const getOrderTransaction = async () => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.GET_ORDER_TRANSACTION
    );
    console.log("get Orders Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Orders Error:", error?.data.error || error.message);
    throw error;
  }
};
const getStatments = async () => {
  try {
    const response = await ApiHandler().post(vendorEndPoints.GET_STATMENT);
    console.log("get Orders Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Orders Error:", error?.data.error || error.message);
    throw error;
  }
};

const getOrderById = async (body: { order_id: string }) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.GET_ORDER_BY_ID,
      body
    );
    console.log("get Orders Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Orders Error:", error?.data.error || error.message);
    throw error;
  }
};

const updateOrdersStatus = async (body: UpdateOrdersStatus) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.UPDATE_STATUS,
      body
    );
    console.log("get Orders Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Orders Error:", error?.data.error || error.message);
    throw error;
  }
};

const createProducts = async (body: AddProductData) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.CREATE_PRODUCT,
      body
    );
    console.log("create Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("create Product Error:", error?.data.error || error.message);
    throw error;
  }
};

const updateProduct = async (body: AddProductData) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.UPDATE_PRODUCT,
      body
    );
    console.log("create Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("create Product Error:", error?.data.error || error.message);
    throw error;
  }
};

const getVendorEarnings = async () => {
  try {
    const response = await ApiHandler().get(vendorEndPoints.PAYMENT_DETAILS);
    console.log("get Payment Data Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "get Payment Data Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const deleteProductImage = async (body: { image_id: string }) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.DELETE_PRODUCT_IMG,
      body
    );
    console.log("delete Prod Img Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("delete Prod Img Error:", error?.data.error || error.message);
    throw error;
  }
};

const updateProductImage = async (body: {
  product_id: string;
  url: string;
}) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.UPDATE_PRODUCT_IMG,
      body
    );
    console.log("update Products Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("update Products Error:", error?.data.error || error.message);
    throw error;
  }
};

const sendMessage = async (body: {
  chat_room_id?: string;
  message: string;
  user_id?: string;
}) => {
  try {
    console.log("send Message Body:", body);
    const response = await ApiHandler().post(
      vendorEndPoints.SEND_MESSAGE,
      body
    );
    console.log("send Message Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("send Message Error:", error?.data.error || error.message);
    throw error;
  }
};

const getMyMessages = async (body: { room_id: string }) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.GET_MY_MESSAGES,
      body
    );
    console.log("get My messages Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get My messages Error:", error?.data.error || error.message);
    throw error;
  }
};

const AddReview = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.PRODUCT_REVIEW,
      body
    );
    console.log("get My messages Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get My messages Error:", error?.data.error || error.message);
    throw error;
  }
};

const getMychatRooms = async () => {
  try {
    const response = await ApiHandler().post(vendorEndPoints.GET_MY_CHATROOMS);
    console.log("get My chat rooms Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "get My chat rooms Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const disableProduct = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.DISABLE_PRODUCT,
      body
    );
    console.log("disable Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("disable Product Error:", error?.data.error || error.message);
    throw error;
  }
};

const productReview = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.PRODUCT_REVIEW,
      body
    );
    console.log("Product Review Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Product Review Error:", error?.data.error || error.message);
    throw error;
  }
};

const replyProductReview = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.REPLY_PRODUCT_REVIEW,
      body
    );
    console.log("Product Review Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Product Review Error:", error?.data.error || error.message);
    throw error;
  }
};

const deleteReplyProductReview = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.DELETE_REPLY_REVIEW,
      body
    );
    console.log("Product Review Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Product Review Error:", error?.data.error || error.message);
    throw error;
  }
};

const editReviewReply = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.EDIT_REVIEW_REPLY,
      body
    );
    console.log("Product Review Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Product Review Error:", error?.data.error || error.message);
    throw error;
  }
};

const getCheckMyAccount = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.CHECK_MY_ACCOUNT,
      body
    );
    console.log("check Account Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("check Account Error:", error?.data.error || error.message);
    throw error;
  }
};

const generateConnecAccountLink = async () => {
  try {
    const response = await ApiHandler().post(
      vendorEndPoints.GENERATE_CONNECT_LINK,
    );
    console.log("check Account Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("check Account Error:", error?.data.error || error.message);
    throw error;
  }
};

const callBackConnectAccountSuccess = async ({ code, state }: { code: string, state: string }) => {
  try {
    const url =  `${vendorEndPoints.VENDOR_CONNECT_CALLBACK}?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
    const response = await ApiHandler().get(url);
    console.log("get Products Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("get Products Error:", error?.response?.data?.error || error.message);
    throw error;
  }
};

const withdrawToStripe = async (data: { amount: number }) => {
  try {
    const response = await ApiHandler().post(vendorEndPoints.WITHDRAW, data);
    console.log("Withdraw to Stripe Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Withdraw to Stripe Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const getWallet = async () => {
  try {
    const response = await ApiHandler().get(vendorEndPoints.GET_WALLET);
    console.log("Get Wallet Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Get Wallet Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const getNotifications = async () => {
  try {
    const response = await ApiHandler().get(vendorEndPoints.GET_NOTIFICATIONS);
    console.log("Get Notifications Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Notifications Error:", error?.data.error || error.message);
    throw error;
  }
};

const markNotificationAsRead = async (notification_id: string) => {
  try {
    const response = await ApiHandler().post(vendorEndPoints.MARK_NOTIFICATION_AS_READ, {
      notification_id
    });
    console.log("Mark Notification As Read Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Mark Notification As Read Error:", error?.data.error || error.message);
    throw error;
  }
};

export {
  createInternalStore,
  getDashboard,
  getStore,
  getStatments,
  getStoresProducts,
  getOrders,
  getOrderById,
  getOrderTransaction,
  updateOrdersStatus,
  createProducts,
  getSingleProduct,
  getVendorEarnings,
  updateProduct,
  deleteProductImage,
  updateProductImage,
  sendMessage,
  getMyMessages,
  getMychatRooms,
  editStore,
  AddReview,
  disableProduct,
  productReview,
  replyProductReview,
  deleteReplyProductReview,
  editReviewReply,
  getCheckMyAccount,
  generateConnecAccountLink,
  callBackConnectAccountSuccess,
  withdrawToStripe,
  getWallet,
  getNotifications,
  markNotificationAsRead,
};

