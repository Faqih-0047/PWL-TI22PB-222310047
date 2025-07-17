import React, { useState } from "react";
import MessegersUI from "./widgets/messegers/MessegersUI";
import { ContactUI } from "./widgets/contacts";
import { Messegers, MyFriend } from "./widgets/constanta/DataChat";

export default function ChapterTwo() {
  const myProfile = { id: "0419029203", name: "Febry" };

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedChat, setSelectedChat] = useState([]);

  const HandlerSelectedChat = (data) => {
    setSelectedUser(data);
    const the_msg = [...Messegers];
    const findChatByUserID = the_msg.find(
      (item) => item.user_id === data.user_id
    );

    if (findChatByUserID) {
      setSelectedChat(findChatByUserID.messages);
    } else {
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
            {myProfile ? (
              <ContactUI
                my_account={myProfile}
                friends={MyFriend}
                selectedUser={selectedUser}
                HandlerSelectedChat={HandlerSelectedChat}
              />
            ) : (
              ""
            )}
          </div>
          <div className="col-10 col-lg-9 col-xxl-8 px-0">
            {myProfile ? (
              <MessegersUI
                profile={myProfile}
                selectedUser={selectedUser}
                selectedChat={selectedChat}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
