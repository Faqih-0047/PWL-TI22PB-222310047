import React from "react";
import moment from "moment";

export default function ChatBody({ data }) {
  const itsme = "Febry";
  const listData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const getDateHeader = (current, previous) => {
    if (!previous) return moment(current).format("DD MMM YYYY");
    if (moment(current).isSame(previous, "day")) return null;
    if (moment(current).isSame(moment(), "day")) return "Today";
    return moment(current).format("DD MMM YYYY");
  };

  return (
    <div style={styles.chatContainer}>
      {listData.map((value, index) => {
        const prevMessage = listData[index - 1];
        const dateHeader = getDateHeader(value.date, prevMessage?.date);

        return (
          <div key={index} style={{ width: "100%" }}>
            {dateHeader && <div style={styles.dateHeader}>{dateHeader}</div>}
            <div
              style={{
                ...styles.chatWrapper,
                justifyContent: value.from === itsme ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.chatBubble,
                  backgroundColor: value.from === itsme ? "#a198a7" : "#a83aef",
                  alignSelf: value.from === itsme ? "flex-end" : "flex-start",
                  borderRadius: value.from === itsme ? "8px 8px 0 8px" : "8px 8px 8px 0",
                }}
              >
                <div style={styles.chatContent}>
                  <span style={styles.chatText}>{value.message}</span>
                  <span style={styles.chatTime}>{moment(value.date).format("HH:mm")}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "15px",
    backgroundColor: "#fff",
  },
  dateHeader: {
    textAlign: "center",
    fontSize: "12px",
    color: "#fff",
    backgroundColor: "#87CEFA",
    padding: "6px 12px",
    borderRadius: "6px",
    margin: "15px auto",
    width: "fit-content",
    fontWeight: "bold",
  },
  chatWrapper: {
    display: "flex",
    marginBottom: "8px",
    width: "100%",
  },
  chatBubble: {
    maxWidth: "60%",
    padding: "10px 14px",
    borderRadius: "8px",
    color: "white",
    wordWrap: "break-word",
    display: "flex",
    flexDirection: "column",
  },
  chatContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  chatText: {
    fontSize: "14px",
    flex: 1,
  },
  chatTime: {
    fontSize: "11px",
    opacity: 0.7,
    whiteSpace: "nowrap",
  },
};
