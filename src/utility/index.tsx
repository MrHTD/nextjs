import { uploadFileAPI } from "@/services";

export async function urlToFile(url: any, fileName?: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileExtension = blob.type.split("/").pop();
  const newFileName = `${fileName || Date.now()}.${fileExtension}`;
  return new File([blob], fileName || newFileName, { type: blob.type });
}

export const fileToURL = (file: File | string | undefined | null): string => {
  if (!file) return ''
  if (typeof file == 'string') return file
  return URL.createObjectURL(file);
};

export function fixFileName(file: File) {
  const fileExtension = file.name.split(".").pop();
  const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
  const newFileName = `${fileNameWithoutExtension
    .split(" ")
    .join("-")}.${fileExtension}`;
  return new File([file], newFileName, { type: file.type });
}
export const generateBarCode = (length: number = 13) => {
  let barcode = "";
  for (let i = 0; i < length; i++) {
    barcode += Math.floor(Math.random() * 10); // Generate a random digit
  }
  return barcode;
};

export const getCookie = (name: string): string | undefined => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return undefined;
};

export const productPrice = (base_price: number, discount: number, discount_type: string) => {
  if (discount_type === "fixed") {
    return base_price - discount;
  }
  return base_price - ((discount / 100) * base_price);
}


export const discountFromatter = (discount: number, discount_type: string) => {
  if (discount_type === "fixed") {
    return `$ ${discount}`;
  }
  return `${discount}%`;
}

export const saveCookie = (name: string, token: string) => {
  document.cookie = `${name}=${token}; path=/; SameSite=Lax`;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const uploadFile = async (File: string | File | undefined | null) => {
  if (!File) return null;
  let file = File;
  if (typeof File == "string") {
    file = await urlToFile(File);
  }
  if (!file) return null;
  const form = new FormData();
  form.append("file", fixFileName(file as File));
  return await uploadFileAPI(form);
};

export const getCompleteImageUrl = (url: string) => {
  if (url?.startsWith('http://') || url?.startsWith('https://')) {
    return url;
  }
  return `http://${url}`;
};
