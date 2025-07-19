import moment from "moment";
import React from "react";

export default function ChatBody({ data }) {
  const itsme = "0419029203";
  const listData = data;

  return (
    <div className="chat-items">
      {listData.map((value, index) => (
        <div
          className="chat-item"
          style={styleChatItems.chatBubleItems}
          key={index}
        >
          <div
            className="chat text-white rounded my-2 p-2"
            style={
              value.from_id === itsme
                ? styleChatItems.chatBubleSender
                : styleChatItems.chatBubleReceiver
            }
          >
            <span className="me-3">{value.messages}</span>
            <span className="chat-date" style={{ fontSize: "11px" }}>
              {moment(value.date).format("HH:mm")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const styleChatItems = {
  chatBubleItems: {
    display: "flex",
    flexDirection: "column",
  },
  chatBubleSender: {
    textAlign: "right",
    backgroundColor: "#a198a7",
    alignSelf: "flex-end",
  },
  chatBubleReceiver: {
    backgroundColor: "#a83aef",
    alignSelf: "flex-start",
  },
};
