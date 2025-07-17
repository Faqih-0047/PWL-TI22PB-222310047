import React, { useEffect, useMemo, useRef, useState } from "react";
import ChatBody from "./components/ChatBody";
import { ButtonPrimary } from "./components/ButtonUI";
import moment from "moment";

export default function MessegersUI({ profile, selectedChat, selectedUser }) {
  const [myChat, setMyChat] = useState([]);
  const [writeChat, setWriteChat] = useState("");
  const [search, setSearch] = useState("");

  const endOfMessegesRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessegesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const ResultMessageData = useMemo(() => {
    let computedData = myChat.map((msg) => {
      const isOutgoing = msg.from_id === profile.id;
      const isHighlight =
        search &&
        Object.keys(msg).some((key) =>
          msg[key].toString().toLowerCase().includes(search.toLowerCase())
        );
      return {
        ...msg,
        date_fmt: moment(msg.date).format("YYYY-MM-DD"),
        isOutgoing,
        isHighlight,
      };
    });

    if (search) {
      computedData = computedData.filter((msg) => msg.isHighlight);
    }

    return computedData;
  }, [myChat, profile.id, search]);

  const handlerSendChat = (e) => {
    e.preventDefault();

    const objChat = {
      id: myChat.length + 1,
      messages: writeChat,
      from_id: profile.id,
      date: moment().format("YYYY-MM-DD HH:mm"),
    };
    setMyChat([...myChat, objChat]);
    setWriteChat("");
  };

  useEffect(() => {
    setMyChat(selectedChat);
    scrollToBottom();
  }, [selectedChat]);

  return (
    <div className="card">
      <div className="card-header d-flex flex-row justify-content-between align-items-center">
        <h3 className="card-title fw-bold fs-4 text-primary m-0">
          Chats with {selectedUser?.name || "Unknown"}
        </h3>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-body">
        {ResultMessageData.length > 0 ? (
          <>
            <div
              className="chat-message px-2 bg-light-primary"
              style={StylesMesseger.chatBox}
            >
              <ChatBody data={ResultMessageData} />
              <div ref={endOfMessegesRef} />
            </div>
            <div className="chat-send bg-light p-3">
              <form method="post" autoComplete="off" onSubmit={handlerSendChat}>
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    autoFocus={true}
                    value={writeChat}
                    onChange={(e) => setWriteChat(e.target.value)}
                  />
                  <ButtonPrimary
                    items={{
                      title: "Send",
                      btn_class: "btn-icon btn-primary",
                      type: "submit",
                    }}
                  >
                    <i className="bi bi-send"></i>
                  </ButtonPrimary>
                </div>
              </form>
            </div>
          </>
        ) : (
          <EmptyChat />
        )}
      </div>
    </div>
  );
}

const EmptyChat = () => {
  return (
    <div className="text-center py-5">
      <h4>No Conversations</h4>
      <p>You haven't selected any chat yet</p>
      <span className="badge bg-secondary">Select a contact</span>
    </div>
  );
};

const StylesMesseger = {
  chatBox: {
    minHeight: "200px",
    maxHeight: "45vh",
    overflowY: "auto",
  },
};
