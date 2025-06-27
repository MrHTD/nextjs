import { StaticImageData } from "next/image";

export interface Country {
  name: string;
  code: string;
  flag: string | StaticImageData;
}

export type Option = {
  label: string;
  value: string;
};

export interface Store {
  id: any;
  name: string;
  description: string;
  location: string;
  profile_image: string;
  rating: number;
}
export interface userData {
  token: string | null | undefined;
  user: {
    id: string | null | undefined;
    name: string | null | undefined;
    email: string | null | undefined;
    role: string | null | undefined;
    store_id: string | null | undefined;
    phone: string | null | undefined;
    is_subscribed?: string | boolean | null | undefined;
  };
}

export interface RootState {
  storeReducer: {
    store: StoreData | null;
  };
  userReducer: { user: userData | null };
}

export interface StoreData {
  id: string;
  name: string;
  cover_image: string;
  profile_image: string;
  category_id: string;
  description: string;
  owner_user: string;
  address: string;
  type: "internal" | "external";
  opening_time: string;
  closing_time: string;
  opening_days: string;
  closing_days: string;
  pickup_location: string;
  default_delivery_location: string | null;
}

export interface selectImage {
  is_selected: boolean;
  id: string;
  url: string;
}

export interface ProductImageType {
  id: string;
  product_id: null | string;
  url: string;
  is_selected: boolean;
}
export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  average_rating: number;
  long_description?: null | string;
  base_price: number;
  discount?: number;
  discount_type?: string;
  marketing_price?: number;
  marketing_price_type?: string;
  stock?: number;
  bar_code?: number;
  sku?: number;
  category_id?: string;
  category_name?: string;
  owner_user?: string;
  owner_name?: string;
  product_images: ProductImageType[];
  is_active?: boolean;
  is_deleted?: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Product extends ProductCardProps {
  id: string;
  price: string;
  name: string;
  description: string;
  isLiked: boolean;
  base_price: number;
  currenySign: string;
  product_images: ProductImageType[];
  url: string;
  store: Store;
  category: any;
  total_rating?: any;
  tags: any;
  average_rating: number;
  reviews: any;
  stock?: number;
  discount?: number;
  discount_type?: string;
}

export interface ApprovalData {
  name: string;
  registered: string;
  imagesrc: string | StaticImageData;
}

export interface PendingData {
  name: string;
  registered: string;
  imagesrc: string | StaticImageData;
}
export interface ManageVendorData {
  imagesrc: string | StaticImageData;
  storeName: string;
  vendorName: string;
  Category: string;
  Email: string;
  Phone: string;
}
export interface ManageAffiliateData {
  imagesrc: string | StaticImageData;
  storeName: string;
  vendorName: string;
  Category: string;
  Email: string;
  Phone: string;
}
export interface AdminApealsData {
  imagesrc: string | StaticImageData;
  apealUser: string;
  apealDesc: string;
}

export interface Program {
  programName: string;
  programDueDate: string;
  programStatus: string;
  programProductsCount: string;
}

export interface CartData {
  product: Product;
  quantity: number;
}

export interface RecentOrdersTable {
  product: string;
  color: string;
  boughtOn: string;
  price: string;
  orderId: string;
}

export type profileCardsData = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  Gender: string;
  address: string;
};

export type CategoriesTypes =
  | "store"
  | "product"
  | "vendor"
  | "affiliate"
  | "admin"
  | "appeals"
  | "program"
  | "cart"
  | "recentOrders"
  | "profileCards";
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  cat_type: CategoriesTypes;
}

// > create internal store < //

export interface VendorStoreFormData {
  name: string;
  cover_image?: File;
  profile_image?: File;
  category_id: string;
  description: string;
  address: string;
  type: "internal" | "external";
  opening_time: string;
  closing_time: string;
  opening_days: string;
  closing_days: string;
  pickup_location: string;
  default_delivery_location: string;
  email: string;
  phone: string;
  whatsappNumber: string;
}

// > Auth < //

export interface LoginPayload {
  email?: string;
  phone?: string;
  identifier?: string;
  password: string;
  role?: string;
}

export interface signupPayload {
  name: string;
  email: string;
  phone: string;
  conrty_code?: string;
  confirm_password?: string;
  password: string;
  role?: string;
}

// > vendor < //

export interface UpdateOrdersStatus {
  id: string;
  status: string;
}

export interface AddProductData {
  name?: string;
  description?: string;
  long_description?: string;
  base_price?: number;
  discount?: number;
  discount_type?: string;
  collect_images?: File[];
  selected_image?: File;
  product_images?: { url: string; is_selected: boolean }[];
  marketing_price?: number;
  marketing_price_type?: string;
  stock?: number;
  bar_code?: string;
  sku?: string;
  tags?: any[];
  store_id?: string;
  category_id?: string;
  delivery_type?: string;
  delivery_time?: string;
  delivery_cost?: number;
}

export interface PaymentOrderTable {
  id: number;
  details: string;
  orderNumber: number;
  orderDate: Date;
  status: string;
  amount: string;
  releaseStatus: string;
  releaseAmount: number;
  orderimg: StaticImageData | string;
}
