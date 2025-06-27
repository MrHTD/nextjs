import { useState } from "react";
import Heading from "../Base/Heading";
import Input from "../Base/Input";
import Dropdown from "../Base/Dropdown";
import { Option } from "@/constants/Types";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";

interface PricingInventoryProps {
  setState?: (e: any) => void;
  state?: any;
}
interface selectedDropdownOptions {
  discount_type?: Option | null;
}

const discountoptions = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed", value: "fixed" },
];
export function PricingInventory({ state, setState }: PricingInventoryProps) {
  const [selectedOption, setSelectedOption] =
    useState<selectedDropdownOptions | null>(null);
  const getInput = (name: string, e: any) => {
    if (setState) setState((prev: any) => ({ ...prev, [name]: e }));
  };
  const getInputDropdown = (name: string, e: any) => {
    setSelectedOption((prev) => ({ ...prev, [name]: e }));
    if (setState) setState((prev: any) => ({ ...prev, [name]: e.value }));
  };
  return (
    <div className="col-span-1 md:col-span-2">
      <div className="flex flex-col gap-4">
        <div className="row-span-1 bg-white rounded-md border border-inputborder p-4 space-y-3">
          <Heading level={5} className="text-textsecondary">
            Pricing
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-1">
              <Heading level={6} className="text-sm font-normal text-[#656565]">
                Base Price
              </Heading>
              <Input
                value={state?.base_price}
                type="price"
                inputMode="decimal"
                onChange={(e) => getInput("base_price", Number(e.target.value))}
                placeholder="Write Base Price here..."
              />
            </div>
            <div className="col-span-1">
              <Heading level={6} className="text-sm font-normal text-[#656565]">
                Marketing Percentage
              </Heading>
              <Input
                type="price"
                value={state?.marketing_price}
                inputMode="decimal"
                onChange={(e) =>
                  getInput("marketing_price", Number(e.target.value))
                }
                placeholder="10%"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <div className="col-span-1">
              <Heading
                level={6}
                className="text-sm font-normal text-[#656565] mb-3"
              >
                Discount Percentage(%)
              </Heading>
              <Input
                value={state?.discount}
                type="price"
                inputMode="decimal"
                onChange={(e) => getInput("discount", Number(e.target.value))}
                placeholder="Write Discount Percentage here..."
                />
            </div>
            <div className="col-span-1">
              <Heading
                level={6}
                className="text-sm font-normal text-[#656565] mb-3"
                >
                Discount Type
              </Heading>
              <AutoCompleteDropdown
                options={discountoptions}
                selectedOption={
                  selectedOption?.discount_type || {
                    label: state?.discount_type,
                    value: "",
                  }
                }
                setSelectedOption={(option) =>
                  getInputDropdown("discount_type", option)
                }
                placeholder="Select a discount type"
                className="text-sm text-[#656565]"
              />
            </div>
          </div>
        </div>
        <div className="row-span-1 bg-white rounded-md border border-inputborder p-4 space-y-3">
          <Heading level={5} className="text-textsecondary">
            Inventory
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="col-span-1">
              <Heading
                level={6}
                className="text-sm font-normal text-[#656565] mb-3"
              >
                SKU
              </Heading>
              <Input
                type="digit"
                inputMode="decimal"
                value={state?.sku}
                onChange={(e) => getInput("sku", e.target.value)}
                placeholder="113092."
              />
            </div>
            <div className="col-span-1">
              <Heading
                level={6}
                className="text-sm font-normal text-[#656565] mb-3"
                >
                Barcode
              </Heading>
              <Input
                type="digit"
                inputMode="decimal"
                value={state?.bar_code}
                onChange={(e) => getInput("bar_code", e.target.value)}
                placeholder="0924289012"
              />
            </div>
            <div className="col-span-1">
              <Heading
                level={6}
                className="text-sm font-normal text-[#656565] mb-3"
                >
                Quantity
              </Heading>
              <Input
                type="digit"
                inputMode="decimal"
                value={state?.stock}
                onChange={(e) => getInput("stock", Number(e.target.value))}
                placeholder="Type Product Quantity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
