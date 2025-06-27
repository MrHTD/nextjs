import Heading from "../Base/Heading";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";

interface Props {
  selectedcategory?: any;
  setSelectedcategory?: any;
  categoriesData?: any;
  tagData?: any;
  selectedproducttags?: any;
  setSelectedproducttags?: any;
  delivaryChargesData?: any;
  deliveryCharge?: any;
  setDeliveryCharge?: any;
}

export function Category(prop: Props) {
  const {
    categoriesData,
    tagData,
    delivaryChargesData,
    selectedcategory,
    setSelectedcategory,
    selectedproducttags,
    setSelectedproducttags,
    deliveryCharge,
    setDeliveryCharge,
  } = prop;

  return (
    <div className="col-span-1 bg-white rounded-md border border-inputborder space-y-3 p-4">
      <Heading level={5} className="text-textsecondary">
        Additional
      </Heading>
      <Heading level={6} className="text-sm font-normal text-[#656565]">
        Category
      </Heading>
      <AutoCompleteDropdown
        options={categoriesData}
        selectedOption={selectedcategory}
        setSelectedOption={setSelectedcategory}
        placeholder="Select a Product Category"
        className="text-sm text-[#656565]"
      />
      <Heading level={6} className="text-sm font-normal text-[#656565]">
        Tag
      </Heading>
      <AutoCompleteDropdown
        options={tagData}
        selectedOption={selectedproducttags}
        setSelectedOption={setSelectedproducttags}
        placeholder="Select a Tag"
        className="text-sm text-[#656565]"
      />
      <Heading level={6} className="text-sm font-normal text-[#656565]">
        Delivery Charges
      </Heading>
      <AutoCompleteDropdown
        options={delivaryChargesData}
        selectedOption={deliveryCharge}
        setSelectedOption={setDeliveryCharge}
        placeholder="Select a Delivery Charge"
        className="text-sm text-[#656565]"
      />
    </div>
  );
}
