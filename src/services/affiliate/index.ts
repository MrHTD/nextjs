import { affiliateEndPoints } from "../endpoints";
import ApiHandler from "../index";

const getSubscriptions = async () => {
  try {
    const response = await ApiHandler().get(
      affiliateEndPoints.GET_SUBSCRIPTIONS
    );
    console.log("Get Subscriptions Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Get Subscriptions Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const subscribe = async (body: { subscription_id: string }) => {
  try {
    const response = await ApiHandler().post(
      affiliateEndPoints.SUBSCRIBE,
      body
    );
    console.log("Subscribe Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Subscribe Error:", error?.data.error || error.message);
    throw error;
  }
};

const createAffiliateAllProduct = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      affiliateEndPoints.CREATE_AFFILIATE_ALL_PRODUCT,
      body
    );
    console.log("Create Affiliate All Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Create Affiliate All Product Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};

const createAffiliateSpecificProduct = async (body: any) => {
  try {
    const response = await ApiHandler().post(
      affiliateEndPoints.CREATE_AFFILIATE_SPECIFIC_PRODUCT,
      body
    );
    console.log("Create Affiliate Specific Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Create Affiliate Specific Product Error:", error.message);
    throw error;
  }
};

const getAffiliateAllProducts = async () => {
  try {
    const response = await ApiHandler().get(
      affiliateEndPoints.GET_AFFILIATE_ALL_PRODUCTS
    );
    console.log("Get Affiliate All Products Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Affiliate All Products Error:", error.message);
    throw error;
  }
};

const getAffiliateSpecificProducts = async () => {
  try {
    const response = await ApiHandler().get(
      affiliateEndPoints.GET_AFFILIATE_SPECIFIC_PRODUCTS
    );
    console.log("Get Affiliate Specific Products Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Affiliate Specific Products Error:", error.message);
    throw error;
  }
};


const deleteAffiliateProgram = async (body:{program_id : string}) => {
  try {
    const response = await ApiHandler().post(
      affiliateEndPoints.DELETE_AFFILIATE_PROGRAM,
      body
    );
    console.log("Create Affiliate All Product Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Create Affiliate All Product Error:",
      error?.data.error || error.message
    );
    throw error;
  }
};


export {
  getSubscriptions,
  subscribe,
  createAffiliateAllProduct,
  createAffiliateSpecificProduct,
  getAffiliateAllProducts,
  getAffiliateSpecificProducts,
  deleteAffiliateProgram,

};
