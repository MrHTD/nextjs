import Heading from "../Base/Heading";
import Input from "../Base/Input";

interface GeneralInformationProps {
  setState?: (e: any) => void;
  state?: any;
}
export function GeneralInformation({
  state,
  setState,
}: GeneralInformationProps) {
  const getInput = (name: string, e: any) => {
    if (setState)
      setState((prev: any) => ({ ...prev, [name]: e.target.value }));
  };
  return (
    <div className="col-span-1 md:col-span-2 bg-white rounded-md border border-inputborder p-4 space-y-3">
      <Heading level={5} className="text-textsecondary">
        General information
      </Heading>
      <Heading level={6} className="text-sm font-normal text-[#656565]">
        Product Name
      </Heading>
      <Input
        onChange={(e) => getInput("name", e)}
        type="text"
        value={state?.name}
        placeholder="Write Product Name here..."
      />
      <Heading level={6} className="text-sm font-normal text-[#656565]">
        Description
      </Heading>
      <Input
        onChange={(e) => getInput("description", e)}
        type="text"
        value={state?.description}
        placeholder="Write Description here..."
      />
      <Heading level={6} className="text-sm font-normal text-[#656565]">
        Long Description
      </Heading>
      <textarea
        onChange={(e) => getInput("long_description", e)}
        value={state?.long_description}
        id="message"
        rows={5}
        typeof="text"
        className="block p-2.5 w-full text-sm text-secondary rounded-lg border resize-none border-gray-300 focus:outline-none focus:ring-primary focus:border-primary overflow-hidden max-h-60"
        placeholder="Write your long description here..."
      ></textarea>
    </div>
  );
}
