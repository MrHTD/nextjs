"use client";
import React, { useEffect, useState, useRef } from "react";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import BaseImage from "@/components/Base/BaseImage";
import Input from "@/components/Base/Input";
import { twMerge } from "tailwind-merge";
import {
  HiOutlineChat,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import { MdOutlineInfo } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { GoPaperclip } from "react-icons/go";
import { useSocket } from "@/providers/socket";
import { getMyMessages, sendMessage } from "@/services/vendor";
import { useSelector } from "react-redux";
import { getCompleteImageUrl } from "@/utility";
import { RootState } from "@/config/redux";
import { MessageChatRoomView } from "@/components/MessagechatRoomView";

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [chatRooms, setChatRooms] = useState<any>();
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isConnected, socket } = useSocket();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const user = useSelector((state: RootState) => state.userReducer.user);

  const handleSendMessage = async () => {
    if (!newMessage) return;

    const message = {
      chat_room_id: chatRooms?.id,
      sender: user,
      message: newMessage,
      type: "sent",
      time: Date.now(),
    };
    try {
      const response = await sendMessage(message);
      console.log("send message Response:", response.result);
    } catch (e) {
      console.log(e);
    } finally {
      setNewMessage("");
    }
  };

  const handleGetMessages = async (room: any) => {
    setChatRooms(room);
    try {
      if (isConnected) {
        socket.emit("join_room", { chat_room_id: room.id });
      }
    } catch (e) {
      console.log("Error in emit join room:", e);
    }
    try {
      const response = await getMyMessages({ room_id: room.id });
      console.log("get message Response:", response.result);
      setMessages(response.result);
    } catch (e) {
      console.log("Error in get message:", e);
    }
  };

  useEffect(() => {
    if (isConnected) {
      socket.on("message", (data: any) => {
        console.log("Received: in message Page", data);
        setMessages((prev) => [
          ...prev,
          {
            message: data.message,
            type: "received",
            time: data.time,
            sender: data.user,
          },
        ]);
      });
    }
  }, [isConnected]);

  return (
    <Container className="overflow-hidden">
      <div className="flex flex-col md:flex-row p-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          Messages
        </Heading>
      </div>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="flex flex-col flex-1 bg-white border border-inputborder rounded-md p-5 md:mr-4">
          {chatRooms ? <>
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BaseImage
                  src={
                    chatRooms?.profile_image?.includes("https")
                      ? getCompleteImageUrl(chatRooms?.profile_image)
                      : `/assets/images/placeholder.png`
                  }
                  height={50}
                  width={50}
                  alt="Profile-Pic"
                  className="rounded-full object-cover w-[50px] h-[50px]"
                />
                <div>
                  <Heading level={6} className="text-textprimary">
                    {chatRooms?.name}
                  </Heading>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <HiOutlinePhone
                  size={24}
                  className="cursor-pointer hover:text-primary"
                />
                <HiOutlineVideoCamera
                  size={24}
                  className="cursor-pointer hover:text-primary"
                />
                <MdOutlineInfo
                  size={24}
                  className="cursor-pointer hover:text-primary"
                />
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="block md:hidden cursor-pointer hover:text-primary"
                >
                  <HiOutlineChat size={24} />
                </button>
              </div>
            </div>
            <div
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 rounded-md scrollbar-hide"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {messages &&
                messages?.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={twMerge(
                      "flex",
                      msg?.sender?.id === user?.id
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    <div>
                      <div
                        className={twMerge(
                          "p-3 rounded-lg mb-2",
                          msg?.sender?.id === user?.id
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                        )}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 block text-right">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="ml-3 p-2 md:p-3 bg-primary text-white rounded-full">
                <GoPaperclip className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <Input
                type="identifier"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={handleSendMessage}
                className="ml-3 p-2 md:p-3 bg-textsecondary text-white rounded-full"
              >
                <VscSend className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          </> : <div className="h-full flex items-center justify-center">No chat room is selected</div>}
        </div>
        <MessageChatRoomView
          getRooms={(e) => {
            handleGetMessages(e);
            setChatRooms(e);
            setIsSidebarOpen(false);
          }}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </Container>
  );
}
