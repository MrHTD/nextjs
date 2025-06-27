"use client";
import BaseImage from "@/components/Base/BaseImage";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Input from "@/components/Base/Input";
import React, { useState } from "react";
import { GoPaperclip } from "react-icons/go";
import {
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import { MdOutlineInfo } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

export default function Support() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Abdul Samad",
      content: "Hello! How are you?",
      type: "received",
      time: "09:25 AM",
    },
    {
      id: 2,
      sender: "You",
      content: "I am good. How about you?",
      type: "sent",
      time: "09:26 AM",
    },
    {
      id: 3,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 4,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 5,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 6,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 7,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 8,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 9,
      sender: "Abdul Samad",
      content: "Have a great working week!",
      type: "received",
      time: "09:27 AM",
    },
    {
      id: 10,
      sender: "You",
      content: "Munasib nhi hai itna jhoot bolna!",
      type: "sent",
      time: "09:69 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          type: "sent",
          time: "Now",
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Container className="overflow-hidden">
      <div className="flex flex-col md:flex-row p-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          Support
        </Heading>
      </div>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="flex flex-col flex-1 bg-white border border-inputborder rounded-md p-5 md:mr-4">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BaseImage
                src="/assets/images/sellerimg.png"
                height={50}
                width={50}
                alt="Profile-Pic"
                className="rounded-full object-cover"
              />
              <div>
                <Heading level={6} className="text-textprimary">
                  Abdul Samad
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
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 rounded-md scrollbar-hide"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={twMerge(
                  "flex",
                  msg.type === "sent" ? "justify-end" : "justify-start"
                )}
              >
                <div>
                  <div
                    className={twMerge(
                      "p-3 rounded-lg mb-2",
                      msg.type === "sent"
                        ? "bg-primary text-white"
                        : "bg-gray-200"
                    )}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 block text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleSendMessage}
              className="ml-3 p-2 md:p-3 bg-primary text-white rounded-full"
            >
              <GoPaperclip className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <Input
              type="text"
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
        </div>
      </div>
    </Container>
  );
}
