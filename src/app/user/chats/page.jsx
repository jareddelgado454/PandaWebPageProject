"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { Contexto } from "../layout";
import { client } from "@/contexts/AmplifyContext";
import { LIST_MY_CHATS } from "@/graphql/users/query/technician";

const Chats = () => {
  const { user } = useContext(Contexto);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (user) {
      retrieveChats();
    }
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
    }
  }, [selectedChat]);

  const retrieveChats = async () => {
    try {
      setLoadingChats(true);
      const listChatsResult = await client.graphql({
        query: LIST_MY_CHATS,
        variables: { technicianId: user.sub },
      });

      const chatsFromTechnicians =
        listChatsResult.data?.listChatsWithTechnicians.items || [];
      const chatsFromAdmins =
        listChatsResult.data?.listChatsWithAdmins.items || [];

      const combinedChats = [...chatsFromTechnicians, ...chatsFromAdmins];

      combinedChats.forEach((chat) => {
        if (chat.messages && chat.messages.items) {
          chat.messages.items = chat.messages.items.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      });

      const sortedChats = combinedChats.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setChats(sortedChats);
      if (sortedChats.length > 0) {
        setSelectedChat(sortedChats[0]);
      }
      setLoadingChats(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setLoadingChats(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.customer.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      chat.messages.items.some((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="text-white w-full sm:h-[calc(100vh-80px)] h-[calc(100vh-120px)] flex flex-row">
      <div className="w-[350px] p-3 flex flex-col border-r-[1px] border-r-zinc-800 border-t-[1px] border-t-zinc-800 overflow-y-auto">
        <div className="text-white font-jost text-[24px] font-semibold w-full">
          Chats
        </div>

        {/* Search Bar */}
        <div className="mt-4 flex items-center bg-zinc-800 rounded-full px-3 py-2 w-full">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-white outline-none text-[15px]"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Chat List */}
        <div className="mt-4 space-y-4">
          {loadingChats ? (
            <p className="text-gray-400">Loading chats...</p>
          ) : searchQuery && filteredChats.length === 0 ? (
            <p className="text-gray-400">No chats found for your search.</p>
          ) : chats.length === 0 ? (
            <p className="text-gray-400">No chats available.</p>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 p-2 overflow-hidden cursor-pointer rounded-lg ${
                  selectedChat?.id === chat.id ? "bg-zinc-800" : ""
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <img
                  src={
                    chat.customer.profilePicture
                      ? `https://d3nqi6yd86hstw.cloudfront.net/public/${chat.customer.profilePicture}`
                      : "/image/defaultProfilePicture.jpg"
                  }
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between overflow-hidden">
                    <span
                      className="font-semibold text-white truncate text-[15px]"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(
                          chat.customer.fullName,
                          searchQuery
                        ),
                      }}
                    ></span>
                    <span className="text-gray-400 text-sm">
                      {new Date(chat.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className="text-gray-400 text-sm truncate"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        chat.messages?.items[chat.messages.items.length - 1]
                          ?.content || "No messages yet",
                        searchQuery
                      ),
                    }}
                  ></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Chat Details and Messages */}
      <div className="w-full flex flex-col h-full border-t-[1px] border-t-zinc-800">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="w-full flex flex-row items-center p-3">
              <img
                src={
                  selectedChat.customer.profilePicture
                    ? `https://d3nqi6yd86hstw.cloudfront.net/public/${selectedChat.customer.profilePicture}`
                    : "/image/defaultProfilePicture.jpg"
                }
                alt="profile"
                className="w-11 h-11 rounded-full mr-2"
              />
              <span className="text-white font-semibold text-[18px]">
                {selectedChat.customer.fullName}
              </span>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 flex flex-col justify-between overflow-y-auto ">
              <div className="p-4 flex flex-col items-center ">
                <img
                  src={
                    selectedChat.customer.profilePicture
                      ? `https://d3nqi6yd86hstw.cloudfront.net/public/${selectedChat.customer.profilePicture}`
                      : "/image/defaultProfilePicture.jpg"
                  }
                  alt="profile"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <span className="text-white font-semibold text-[18px]">
                  {selectedChat.customer.fullName}
                </span>
                <span className="text-gray-400 text-sm">Customer</span>
              </div>
              <div className="p-4 flex flex-col justify-end">
                {selectedChat.messages?.items.map((msg, index) => (
                  <div key={msg.id}>
                    {index === 0 ||
                    new Date(
                      selectedChat.messages.items[index - 1].createdAt
                    ).toDateString() !==
                      new Date(msg.createdAt).toDateString() ? (
                      <div className="text-center text-gray-400 text-sm my-2">
                        {new Date(msg.createdAt).toDateString()}
                      </div>
                    ) : null}
                    <div
                      className={`flex ${
                        msg.sender === user.sub
                          ? "justify-end"
                          : "justify-start"
                      } mb-2`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sender === user.sub
                            ? "bg-meantExtraDark text-white"
                            : "bg-zinc-700 text-gray-200"
                        }`}
                      >
                        <p
                          dangerouslySetInnerHTML={{
                            __html: highlightText(msg.content, searchQuery),
                          }}
                        ></p>
                        <span className="block text-xs text-gray-400 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-400 p-4">Select a chat to view messages</p>
        )}
         <div className="p-4 flex items-center border-t-[1px] border-t-zinc-800">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-zinc-800 text-white outline-none rounded-full px-4 py-2"
            disabled
          />
          <button className="ml-2 p-2 rounded-full bg-meantExtraDark text-white" disabled>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
