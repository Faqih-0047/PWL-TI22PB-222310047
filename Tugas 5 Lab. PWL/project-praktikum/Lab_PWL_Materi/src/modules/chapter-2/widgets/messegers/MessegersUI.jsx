import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FiMoreVertical } from "react-icons/fi";

const MessegersUI = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  const handleSend = async () => {
    const token = localStorage.getItem("token");
    if (!message.trim()) return;

    const newMessage = {
      from_id: currentUserId,
      to_user_id: selectedUser.id,
      messeges: message,
    };

    try {
      const res = await axios.post("http://localhost:3000/api/messages", newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (error) {
      console.error("Gagal mengirim pesan:", error.message);
    }
  };

  const handleEdit = async (msg) => {
    const token = localStorage.getItem("token");
    const newText = prompt("Edit pesan:", msg.messeges);
    if (!newText || newText.trim() === "" || newText === msg.messeges) return;

    try {
      const res = await axios.put(
        `http://localhost:3000/api/messages/${msg.id}`,
        { messeges: newText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, messeges: res.data.messeges } : m))
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

  const filteredMessages = messages.filter((msg) =>
    msg.messeges.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex flex-column h-100">
      {/* Header chat */}
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

      {/* Pesan */}
      <div
        className="flex-grow-1 overflow-auto px-3 py-2 bg-light"
        style={{ maxHeight: "calc(100vh - 170px)" }}
      >
        {filteredMessages.map((msg, index) => {
          const isMyMessage = msg.from_id === currentUserId;
          return (
            <div
              key={index}
              className={`mb-2 d-flex ${isMyMessage ? "justify-content-end" : "justify-content-start"}`}
              style={{ position: "relative" }}
            >
              <div
                className={`p-2 rounded ${isMyMessage ? "bg-primary text-white" : "bg-white text-dark"}`}
                style={{ maxWidth: "60%" }}
              >
                {msg.messeges}
              </div>

              {/* Tombol titik tiga */}
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
                      <button className="dropdown-item" onClick={() => handleEdit(msg)}>
                        Edit
                      </button>
                      <button className="dropdown-item text-danger" onClick={() => handleDelete(msg)}>
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Form Kirim Pesan */}
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