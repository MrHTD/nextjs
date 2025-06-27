import React from "react";
import { Option } from "@/constants/Types";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";

const appareloptions = [
  { label: "Electronics", value: "Electronics" },
  { label: "Furniture", value: "Furniture" },
  { label: "Apparel & Textile", value: "Apparel & Textile" },
  { label: "Automotive", value: "Automotive" },
];
const agriculturefoodoptions = [
  { label: "Crop Production", value: "Crop Production" },
  { label: "Livestock & Dairy", value: "Livestock & Dairy" },
  { label: "Sustainable Agriculture", value: "Sustainable Agriculture" },
  { label: "Food Processing & Packaging", value: "Food Processing & Packaging" },
];
const electronicsoptions = [
  { label: "Crop Production", value: "Crop Production" },
  { label: "Livestock & Dairy", value: "Livestock & Dairy" },
  { label: "Sustainable Agriculture", value: "Sustainable Agriculture" },
  { label: "Food Processing & Packaging", value: "Food Processing & Packaging" },
];
const healthandbeautyoptions = [
  { label: "Skincare", value: "Skincare" },
  { label: "Hair Care", value: "Hair Care" },
  { label: "Personal Wellness", value: "Personal Wellness" },
  { label: "Makeup & Cosmetics", value: "Makeup & Cosmetics" },
];
const Accessoriesoptions = [
  { label: "Bags", value: "Bags" },
  { label: "Footwear ", value: "Footwear" },
  { label: "Jewelry & Watches", value: "Jewelry & Watches" },
  { label: "Belts & Wallets", value: "Belts & Wallets" },
];
const Machineryoptions = [
  { label: "Heavy Machinery", value: "Heavy Machinery" },
  { label: "Industrial Parts ", value: "Industrial Parts" },
  { label: "Hand Tools", value: "Hand Tools" },
  { label: "Power Tools", value: "Power Tools" },
];
const Constructionoptions = [
  { label: "Building Materials", value: "Building Materials" },
  { label: "Home Improvement", value: "Home Improvement" },
  { label: "Plumbing & Electrical", value: "Plumbing & Electrical" },
  { label: "Furniture & Decor", value: "Furniture & Decor" },
];
const Transportationoptions = [
  { label: "Vehicles ", value: "Vehicles " },
  { label: "Auto Parts & Accessories", value: "Auto Parts & Accessories" },
  { label: "Motor Oils & Fluids", value: "Motor Oils & Fluids" },
  { label: "Motor Oils & Fluids", value: "Motor Oils & Fluids" },
];
const chemicalsoptions = [
  { label: "Chemicals", value: "Chemicals" },
  { label: "Metallurgy", value: "Metallurgy" },
  { label: "Plastics & Polymers", value: "Plastics & Polymers" },
  { label: "Industrial Equipment & Machinery", value: "Industrial Equipment & Machinery" },
];
const electricaloptions = [
  { label: "Electrical Equipment", value: "Electrical Equipment" },
  { label: "Telecommunication Devices", value: "Telecommunication Devices" },
  { label: "Power Generation & Distribution", value: "Power Generation & Distribution" },
  { label: "Networking & Connectivity", value: "Networking & Connectivity" },
];
const giftsoptions = [
  { label: "Gifts", value: "Gifts" },
  { label: "Sports Equipment", value: "Sports Equipment" },
  { label: "Outdoor & Adventure", value: "Outdoor & Adventure" },
  { label: "Toys & Games", value: "Toys & Games" },
];
const packagingoptions = [
  { label: "Packaging Materials", value: "Packaging Materials" },
  { label: "Office Supplies", value: "Office Supplies" },
  { label: "Furniture & Equipment", value: "Furniture & Equipment" },
  { label: "Stationery & Organizers", value: "Stationery & Organizers" },
];


export default function DeliveryCalculationModal({ onClose, onSubmit }: any) {
  // const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: Option | null }>({
  //   apparel: null,
  //   agricultureFood: null,
  //   electronics: null,
  //   healthBeauty: null,
  //   accessories: null,
  //   machinery: null,
  //   construction: null,
  //   transportation: null,
  //   chemicals: null,
  //   electrical: null,
  //   gifts: null,
  //   packaging: null,
  // });

  // const handleOptionChange = (category: string, option: Option | null) => {
  //   setSelectedOptions((prevOptions) => ({
  //     ...prevOptions,
  //     [category]: option,
  //   }));
  // };
  // let submitHandler = () => {
  //   onSubmit(selectedOptions);
  //   onClose()
  // }

  const selectedHandler = (option: Option | null) => {
    onClose()
    onSubmit(option?.label)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" >
      <div className="absolute bg-black bg-opacity-50 h-screen w-screen " onClick={onClose} />
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        
        <div>
          <AutoCompleteDropdown
            options={appareloptions}
            // selectedOption={selectedOptions}
            setSelectedOption={selectedHandler}
            placeholder='Apparel & textile'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={agriculturefoodoptions}
            // selectedOption={selectedAgricultureFoodOption}
            setSelectedOption={selectedHandler}
            placeholder='Agriculture & Food'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={electronicsoptions}
            // selectedOption={selectedElectronicsOption}
            setSelectedOption={selectedHandler}
            placeholder='Electronics'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={healthandbeautyoptions}
            // selectedOption={selectedHealthBeautyOption}
            setSelectedOption={selectedHandler}
            placeholder='Health and beauty'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={Accessoriesoptions}
            // selectedOption={selectedAccessoriesOption}
            setSelectedOption={selectedHandler}
            placeholder='Bags, footwear & accessories'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={Machineryoptions}
            // selectedOption={selectedmachineryOption}
            setSelectedOption={selectedHandler}
            placeholder='Machinery, Industrial parts & tools'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={Constructionoptions}
            // selectedOption={selectedconstructionOption}
            setSelectedOption={selectedHandler}
            placeholder='Home & Construction'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={Transportationoptions}
            // selectedOption={selectedtransportationOption}
            setSelectedOption={selectedHandler}
            placeholder='Auto & Transportation'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={chemicalsoptions}
            // selectedOption={selectedchemicalsOption}
            setSelectedOption={selectedHandler}
            placeholder='Chemicals, metallurgy & plastics'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={electricaloptions}
            // selectedOption={selectedelectricalOption}
            setSelectedOption={selectedHandler}
            placeholder='Electrical Equipment & Telecoms'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={giftsoptions}
            // selectedOption={selectedgiftsOption}
            setSelectedOption={selectedHandler}
            placeholder='Gifts, sport & toys'
            className="border-none"
          />
          <AutoCompleteDropdown
            options={packagingoptions}
            // selectedOption={selectedpackagingOption}
            setSelectedOption={selectedHandler}
            placeholder='Packaging & Office'
            className="border-none"
          />
        </div>
      </div>
    </div >
  );
}
