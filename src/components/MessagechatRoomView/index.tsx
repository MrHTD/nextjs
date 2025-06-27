import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import BaseImage from "../Base/BaseImage";
import { getCompleteImageUrl } from "@/utility";
import Input from "../Base/Input";
import { getMychatRooms } from "@/services/vendor";
import Heading from "../Base/Heading";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import moment from "moment";
// ...existing imports...

interface ChatRoom {
  id: string;
  profile_image: string;
  title: string;
  last_message: string;
  timestamp: string;
}

interface MessageChatRoomViewProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  getRooms: (room: any) => void;
}

export const MessageChatRoomView = ({
  isSidebarOpen,
  setIsSidebarOpen,
  getRooms,
}: MessageChatRoomViewProps) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handlerClickOnUser = (room: any) => {
    console.log("User id:", room);
    if (getRooms) {
      getRooms(room);
    }
  };

  const handleGetMyChatRooms = async () => {
    try {
      const response = await getMychatRooms();
      console.log("get chat rooms Response:", response);
      setChatRooms(response?.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // handleGetMessages();
    handleGetMyChatRooms();
  }, []);

  const filteredChatRooms = chatRooms.filter((room: any) =>
    room?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={twMerge(
        "fixed md:relative overflow-y-auto scrollbar-hide top-0 right-0 w-[85%] md:w-[30%] h-full z-40 transform",
        isSidebarOpen
          ? "translate-x-0 overflow-y-auto scrollbar-hide bg-white"
          : "translate-x-full",
        "md:translate-x-0 transition-transform duration-300"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <Heading level={2} className="text-textsecondary">
          Chat
        </Heading>
        <div className="flex items-center gap-4">
          <BsThreeDots
            size={24}
            className="cursor-pointer hover:text-primary"
          />
          <FiEdit size={20} className="cursor-pointer hover:text-primary" />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="block md:hidden hover:text-primary"
          >
            <RxCross2 size={24} />
          </button>
        </div>
      </div>
      {/* Search section */}
      <div className="p-4">
        <Input
          type="text"
          placeholder="Search"
          className="p-2"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Chat rooms list */}
      <div className="overflow-y-auto scrollbar-hide space-y-2 p-4">
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {!loading &&
          !error &&
          filteredChatRooms.map((room: any) => (
            <div
              onClick={() => handlerClickOnUser(room)}
              key={room.id}
              className="flex bg-white items-center gap-2 p-4 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <BaseImage
                src={
                  room?.profile_image?.includes("https")
                    ? getCompleteImageUrl(room?.profile_image)
                    : `/assets/images/placeholder.png`
                }
                height={40}
                width={40}
                alt="Profile-Pic"
                className="rounded-full object-cover w-[40px] h-[40px]"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{room?.name}</p>
                <span className="text-xs text-gray-500 truncate">
                  {room?.last_message?.message?.length > 35
                    ? room?.last_message?.message.slice(0, 35) + "..."
                    : room?.last_message?.message}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {moment(room?.created_at).format("hh:mm A")}
              </span>
            </div>
          ))}

        {!loading && !error && filteredChatRooms.length === 0 && (
          <div className="text-center text-gray-500">No chat rooms found</div>
        )}
      </div>
    </div>
  );
};
