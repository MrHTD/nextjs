import React, { useEffect, useState } from "react";
import Dropdown from "../Base/Dropdown";
import Heading from "../Base/Heading";
import Input from "../Base/Input";
import CountryDropdown from "../Countrydropdown";
import Button from "../Base/Button";
import { Category, Country, Option } from "@/constants/Types/index";
import TimeInput from "../TimeInput";
import { getCategories } from "@/services/public";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";




const countryData = [
  { name: "Pakistan", code: "92", flag: "/assets/icons/countryflags/pak.png" },
  {
    name: "United States",
    code: "1",
    flag: "/assets/icons/countryflags/usa.png",
  },
  {
    name: "United Kingdom",
    code: "44",
    flag: "/assets/icons/countryflags/brit.png",
  },
];

const daysoptions: Option[] = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

interface InternalStorePageProps {
  InternalStoreHandler?: (e: any) => void;
  isButtonVisible?: boolean; // Add this prop
  data?: any;
  isUpdate?: boolean;
  updateStoreHandler?: (e: any) => void;
  isEdit?: boolean;
  setIsEdit?: (e: any) => void;
}

interface selectedDropdownOptions {
  category_id?: Option | null;
  address?: Option | null;
  opening_days?: Option | null;
  closing_days?: Option | null;
  opening_time?: Option | null;
  closing_time?: Option | null;
}

export default function InternalStorePage({
  updateStoreHandler,
  isButtonVisible = true,
  InternalStoreHandler,
  data,
  isUpdate,
  isEdit,
  setIsEdit,
}: InternalStorePageProps) {
  const [selectedOption, setSelectedOption] =
    useState<selectedDropdownOptions | null>(null);
  const [categories, setCategories] = useState<Option[]>([]);

  const [inputVal, setInputVal] = useState({
    category_id: "",
    address: "",
    description: "",
    opening_days: "",
    closing_days: "",
    opening_time: "",
    closing_time: "",
    pickup_location: "",
    default_delivery_location: "",
  });

  useEffect(() => {
    getCategories("store")
      .then((res) => {
        console.log("Categories", res);
        const categoryOptions = (res.result || []).map((cat: Category) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategories(categoryOptions);
      })
      .catch((err) => {
        console.log("Error in getting categories", err);
      });
  }, []);

  useEffect(() => {
    if (data) {
      const cat = categories.find((cat) => cat.value == data?.category_id);
      setSelectedOption({
        category_id: cat ? { label: cat.label, value: cat.value } : null,
        address: { label: data?.address, value: data?.address },
        opening_days: { label: data?.opening_days, value: data?.opening_days },
        closing_days: { label: data?.closing_days, value: data?.closing_days },
        opening_time: { label: data?.opening_time, value: data?.opening_time },
        closing_time: { label: data?.closing_time, value: data?.closing_time },
      });
      setInputVal({
        category_id: data?.category_id,
        address: data?.address,
        description: data?.description,
        opening_days: data?.opening_days,
        closing_days: data?.closing_days,
        opening_time: data?.opening_time,
        closing_time: data?.closing_time,
        pickup_location: data?.pickup_location,
        default_delivery_location: data?.default_delivery_location,
      });
    }
  }, [data]);

  const Clickhandler = () => {
    if (InternalStoreHandler) {
      InternalStoreHandler({
        description: inputVal.description,
        category_id: inputVal.category_id,
        address: inputVal.address,
        opening_days: inputVal.opening_days,
        closing_days: inputVal.closing_days,
        opening_time: inputVal.opening_time,
        closing_time: inputVal.closing_time,
        pickup_location: inputVal.pickup_location,
        default_delivery_location: inputVal.default_delivery_location,
      });
    }
  };

  const handlerUpdate = () => {
    if (updateStoreHandler) {
      updateStoreHandler({
        description: inputVal.description,
        category_id: inputVal.category_id,
        address: inputVal.address,
        opening_days: inputVal.opening_days,
        closing_days: inputVal.closing_days,
        opening_time: inputVal.opening_time,
        closing_time: inputVal.closing_time,
        pickup_location: inputVal.pickup_location,
        default_delivery_location: inputVal.default_delivery_location,
      });
    }
  };

  const validateTwoDigits = (value: string) => {
    const num = parseInt(value);
    return !isNaN(num) && value.length <= 2 && num >= 0 && num <= 12;
  };
  const getDateInput = (name: string, e: any) => {
    if (validateTwoDigits(e.target.value)) {
      setInputVal((prev) => ({ ...prev, [name]: e.target.value }));
    }
  }
  const getInput = (name: string, e: any) => {
    setInputVal((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const getInputDropdown = (name: string, e: any) => {
    setSelectedOption((prev) => ({ ...prev, [name]: e }));
    setInputVal((prev) => ({ ...prev, [name]: e.value }));
  };
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="space-y-6">
            <div>
              <Heading level={5} className="whitespace-normal text-textcolor my-2">
                Shop categories:
              </Heading>
              <AutoCompleteDropdown
                placeholder="select category"
                options={categories}
                selectedOption={selectedOption?.category_id}
                setSelectedOption={(option) =>
                  getInputDropdown("category_id", option)
                }
                disabled={isUpdate && !isEdit}
              />
            </div>
            <Input
              onChange={(e) => getInput("description", e)}
              type="text"
              value={data?.description || ""}
              label="Store Description"
              labelClassName="text-textcolor text-[1rem]"
              disabled={isUpdate && !isEdit}
            />
            <div>
              <Input
                onChange={(e) => getInput("address", e)}
                type="address"
                label="Store Address:"
                labelClassName="text-textcolor text-[1rem]"
                value={data?.address || ""}
                disabled={isUpdate && !isEdit}
              />
              <br />
              <Input
                onChange={(e) => getInput("address", e)}
                type="text"
                label="Default delivery locations:"
                labelClassName="text-textcolor text-[1rem]"
                value={data?.address || ""}
                disabled={isUpdate && !isEdit}
              />
              {/* <AutoCompleteDropdown
                                options={storeoptions}
                                selectedOption={selectedOption?.address}
                                setSelectedOption={(option) => getInputDropdown('address', option)}
                            /> */}
            </div>
            {/* <Input
              onChange={(e) => getInput("email", e)}
              type="email"
              label="Email:"
              labelClassName="text-textcolor text-[1rem]"
              value={data?.email || ""}
              disabled={isUpdate && !isEdit}
            /> */}
            {/* <div>
              <Heading level={5} className="whitespace-normal text-textcolor">
                Phone number:
              </Heading>
              <CountryDropdown
                onInput={(e) => getInput("phone", e)}
                countryList={countryData}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                disabled={isUpdate && !isEdit}
              />
            </div> */}
          </div>
        </div>
        <div className="col-span-1 space-y-6">
          <div className="space-y-6">
            <div>
              <Heading level={5} className="whitespace-normal text-textcolor my-2">
                Opening days:
              </Heading>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center align-middle">
                <AutoCompleteDropdown
                  options={daysoptions}
                  selectedOption={selectedOption?.opening_days}
                  setSelectedOption={(option) =>
                    getInputDropdown("opening_days", option)
                  }
                  disabled={isUpdate && !isEdit}
                />
                <Heading level={6}>To</Heading>
                <AutoCompleteDropdown
                  options={daysoptions}
                  selectedOption={selectedOption?.closing_days}
                  setSelectedOption={(option) =>
                    getInputDropdown("closing_days", option)
                  }
                  disabled={isUpdate && !isEdit}
                />
              </div>
            </div>
            <div>
              <Heading level={5} className="whitespace-normal text-textcolor">
                Opening time:
              </Heading>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center align-middle">
                <TimeInput
                  onChange={(e) => getDateInput("opening_time", e)}
                  className="w-full"
                  placeholder="7:00   |AM"
                  readOnly={isUpdate && !isEdit}
                />
                <Heading level={6}>To</Heading>
                <TimeInput
                  onChange={(e) => getDateInput("closing_time", e)}
                  className="w-full"
                  placeholder="12:00   |PM"
                  readOnly={isUpdate && !isEdit}
                />
              </div>
            </div>
          </div>
          <Input
            onChange={(e) => getInput("pickup_location", e)}
            type="text"
            label="Pickup locations:"
            labelClassName="text-textcolor text-[1rem]"
            value={data?.pickup_location || ""}
            disabled={isUpdate && !isEdit}
          />
          {isUpdate && isEdit ? (
            <div className="flex justify-start md:justify-end mb-5 mt-4">
              <Button
                title="Save"
                isPrimary
                className="px-20 py-3"
                onClick={handlerUpdate}
              />
            </div>
          ) : isUpdate && !isEdit ? (
            <div className="flex justify-start md:justify-end mb-5 mt-4">
              <Button
                title="Edit"
                isPrimary
                className="px-20 py-3"
                onClick={() => {
                  if (setIsEdit) setIsEdit(!isEdit);
                }}
              />
            </div>
          ) : null}
          {/* <Input
            value={data?.whatsapp_number || ""}
            onChange={(e) => getInput("whatsapp_number", e)}
            label="WhatsApp number:"
            labelClassName="text-textcolor text-[1rem]"
            type="text"
            disabled={isUpdate && !isEdit}
          /> */}
        </div>
      </div>
      {isButtonVisible && (
        <div className="flex justify-start md:justify-end mb-5 mt-4">
          <Button
            title="Continue"
            isPrimary
            className="px-20 py-3"
            onClick={Clickhandler}
          />
        </div>
      )}
    </div>
  );
}
