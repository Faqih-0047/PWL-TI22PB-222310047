import React, { useState, useEffect } from "react";
import MessegersUI from "./widgets/messegers/MessegersUI";
import { ContactUI } from "./widgets/contacts";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ChapterTwo() {
  const [myProfile, setMyProfile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found");
        const decoded = jwtDecode(token);
        setMyProfile(decoded);
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    };
    fetchProfile();
  }, []);

  const HandlerSelectedChat = async (user) => {
    setSelectedUser(user);
    try {
      const fromId = myProfile?.id;
      const toId = user?.id;
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `http://localhost:3000/api/messages/${fromId}/${toId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedChat(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error.message);
      setSelectedChat([]);
    }
  };

  return (
    <div id="chapter-two">
      <h1 className="text-center my-4">
        Chapter Two: The Authentication and Messegers
      </h1>
      <div className="px-3">
        <div className="row">
          <div className="col-2 col-lg-3 col-xxl-4 px-0">
            {myProfile && (
              <ContactUI
                selectedUser={selectedUser}
                HandlerSelectedChat={HandlerSelectedChat}
              />
            )}
          </div>
          <div className="col-10 col-lg-9 col-xxl-8 px-0">
            {myProfile && selectedUser && (
              <MessegersUI
                profile={myProfile}
                selectedUser={selectedUser}
                selectedChat={selectedChat}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
