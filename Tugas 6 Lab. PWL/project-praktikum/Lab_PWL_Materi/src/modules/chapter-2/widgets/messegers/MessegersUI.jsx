import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FiMoreVertical } from "react-icons/fi";

// ... import tetap sama

const MessegersUI = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const abusiveWords = ["fuck", "shit", "bitch", "asshole", "bastard", "damn"];
  const negativeWords = ["hate", "annoying", "stupid", "angry", "sucks", "hell"];
  const positiveWords = ["love", "happy", "great", "awesome", "good", "nice", "thanks"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCurrentUserId(decoded.id);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser || !currentUserId) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:3000/api/messages/${currentUserId}/${selectedUser.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data);
      } catch (error) {
        console.error("Gagal mengambil pesan:", error.message);
      }
    };
    fetchMessages();
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSentiment = (text) => {
    const lower = text.toLowerCase();
    const hasPositive = positiveWords.some((w) => lower.includes(w));
    const hasNegative = negativeWords.some((w) => lower.includes(w));
    if (hasPositive) return "positive";
    if (hasNegative) return "negative";
    return "neutral";
  };

  const sanitizeMessage = (text) => {
    const words = text.split(" ");
    let containsAbusive = false;

    const cleanedWords = words.map((word) => {
      const cleaned = word.toLowerCase().replace(/[^a-z]/gi, "");
      if (abusiveWords.includes(cleaned)) {
        containsAbusive = true;
        return "*".repeat(word.length);
      }
      return word;
    });

    return {
      text: cleanedWords.join(" "),
      isAbusive: containsAbusive,
    };
  };

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    if (!message.trim()) return;

    const { text, isAbusive } = sanitizeMessage(message);
    const sentiment = isAbusive ? "neutral" : getSentiment(text);

    const newMessage = {
      from_id: currentUserId,
      to_user_id: selectedUser.id,
      messeges: text,
      sentiment,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/messages", newMessage, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages((prev) => [...prev, { ...res.data, sentiment }]);
      setMessage("");
    } catch (error) {
      console.error("Gagal mengirim pesan:", error.message);
    }
  };

  const handleEdit = async (msg) => {
    const token = localStorage.getItem("token");
    const newText = prompt("Edit pesan:", msg.messeges);
    if (!newText || newText.trim() === "" || newText === msg.messeges) return;

    const { text, isAbusive } = sanitizeMessage(newText);
    const sentiment = isAbusive ? "neutral" : getSentiment(text);

    try {
      const res = await axios.put(
        `http://localhost:3000/api/messages/${msg.id}`,
        { messeges: text, sentiment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = { ...msg, messeges: res.data.messeges, sentiment };

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? updated : m))
      );
    } catch (error) {
      console.error("Gagal mengedit pesan:", error.message);
    } finally {
      setActiveMenu(null);
    }
  };

  const handleDelete = async (msg) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Yakin ingin menghapus pesan ini?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/messages/${msg.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      alert("Pesan berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus pesan:", error.message);
    } finally {
      setActiveMenu(null);
    }
  };

  const handleSpeakAll = () => {
    if (!"speechSynthesis" in window) {
      alert("Text-to-Speech tidak didukung browser ini.");
      return;
    }

    const utterances = [];
    let currentSpeaker = null;
    let paragraph = "";

    filteredMessages.forEach((msg, idx) => {
      const speaker = msg.from_id === currentUserId ? "You" : selectedUser.fullname;
      if (speaker !== currentSpeaker && paragraph) {
        utterances.push(`${currentSpeaker} said: ${paragraph}`);
        paragraph = "";
      }
      paragraph += ` ${msg.messeges}`;
      currentSpeaker = speaker;

      if (idx === filteredMessages.length - 1 && paragraph) {
        utterances.push(`${currentSpeaker} said: ${paragraph}`);
      }
    });

    utterances.forEach((text) => {
      const u = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(u);
    });
  };

  const filteredMessages = messages.filter((msg) =>
    msg.messeges?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column h-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom bg-white">
        <div className="fw-semibold fs-6">
          Chats with {selectedUser?.fullname || "-"}
        </div>
        <input
          type="text"
          className="form-control form-control-sm w-50"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Button TTS */}
      <div className="d-flex justify-content-end mb-2 mt-2 me-3">
        <button className="btn btn-outline-primary btn-sm" onClick={handleSpeakAll}>
          🔊 Bacakan Chat
        </button>
      </div>

      {/* Chat */}
      <div className="flex-grow-1 overflow-auto px-3 py-2 bg-light" style={{ maxHeight: "calc(100vh - 170px)" }}>
        {filteredMessages.map((msg, index) => {
          const isMyMessage = msg.from_id === currentUserId;
          const sentiment = msg.sentiment || getSentiment(msg.messeges || "");
          const bubbleColor =
            sentiment === "positive"
              ? "bg-primary text-white"
              : sentiment === "negative"
              ? "bg-danger text-white"
              : "bg-secondary text-white";

          return (
            <div
              key={index}
              className={`mb-2 d-flex ${isMyMessage ? "justify-content-end" : "justify-content-start"}`}
              style={{ position: "relative" }}
            >
              <div className={`p-2 rounded ${bubbleColor}`} style={{ maxWidth: "60%" }}>
                {msg.messeges}
              </div>

              {isMyMessage && (
                <div className="ms-2 position-relative">
                  <button
                    className="btn btn-sm btn-light"
                    onClick={() => setActiveMenu(activeMenu === msg.id ? null : msg.id)}
                  >
                    <FiMoreVertical />
                  </button>

                  {activeMenu === msg.id && (
                    <div
                      className="position-absolute bg-white shadow p-2 rounded"
                      style={{ top: "100%", right: 0, zIndex: 10 }}
                    >
                      <button className="dropdown-item" onClick={() => handleEdit(msg)}>Edit</button>
                      <button className="dropdown-item text-danger" onClick={() => handleDelete(msg)}>Hapus</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-top bg-white px-3 py-2">
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Ketik pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="btn btn-success" onClick={handleSend}>
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessegersUI;