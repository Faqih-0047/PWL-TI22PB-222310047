import React, { useMemo, useState } from "react";
import { AccountLong } from "../components/AccountUI";
import { Link } from "react-router-dom";
import { ButtonIcon, ButtonSearch } from "../components/ButtonUI";

export function ContactUI({
  my_account,
  friends,
  selectedUser,
  HandlerSelectedChat,
}) {
  const [search, setSearch] = useState([]);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const my_friends = friends;

  const toggleSorting = (field) => {
    if (sorting.field === field) {
      setSorting({
        ...sorting,
        order: sorting.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSorting({ field: field, order: "asc" });
    }
  };

  const ResultData = useMemo(() => {
    let computedData = my_friends;

    if (search) {
      computedData = computedData.filter((listData) => {
        return Object.keys(listData).some((key) =>
          listData[key].toString().toLowerCase().includes(search)
        );
      });
    }

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedData.sort(
        (a, b) => a[sorting.field].localeCompare(b[sorting.field]) * reversed
      );
    }

    return computedData;
  }, [my_friends, search, sorting]);

  return (
    <div className="card card-flush h-100 mb-5 mb-xl-10 rounded-0 rounded-start-1">
      <div className="card-header d-flex flex-row justify-content-between align-items-center">
        <div className="card-title">
          <AccountLong data={my_account} color={"danger"} />
        </div>
        <div className="card-toolbar">
          <Link
            to={"/sign-out"}
            className="btn btn-icon btn-sm"
            title="Sign Out"
          >
            <i className="bi bi-box-arrow-right text-danger fw-bold fs-2x"></i>
          </Link>
        </div>
      </div>
      <div className="card-body d-flex flex-column justify-content-between p-0">
        <div className="my-contact border-top">
          <div className="filters p-2 border-bottom d-flex align-items-center">
            <ButtonSearch setSearch={setSearch} search={search}>
              <i class="bi bi-search"></i>
            </ButtonSearch>
            <ButtonIcon
              title={`Sorting ${sorting.order}`}
              onAction={() => toggleSorting("name")}
            >
              <i className={"bi fw-bold fs-2x bi-filter"}></i>
            </ButtonIcon>
          </div>
          <div className="friends">
            {/* <p className="text-center">List kontak dimari</p> */}
            {Object.values(ResultData).length > 0
              ? ResultData.map((value, index) => (
                  <div
                    className="friend-items"
                    key={index}
                    onClick={() => HandlerSelectedChat(value)}
                  >
                    <AccountLong data={value} color={"info"} />
                  </div>
                ))
              : "No Data Found!"}
          </div>
        </div>
        <p className="fs-6 text-center mb-0 py-3">
          <i className="bi bi-lock-fill"></i>
          <span className="ms-1">
            Your personal messages are <br />
            <span className="text-info">end-to-end encrypted</span>
          </span>
        </p>
      </div>
    </div>
  );
}
