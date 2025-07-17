const AccountLong = ({ data, color }) => {
  return (
    <div className="my-profile d-flex align-items-center border-rounded rounded-1">
      <div className="d-flex flex-stack">
        <div className="symbol mx-2 my-2">
          <div
            className={
              "fs-4 p-2 fw-bold bg-" +
              color +
              " text-inverse-" +
              color +
              "border-rounded rounded-1"
            }
          >
            {data.name ? data.name.charAt(0) : "-"}
          </div>
        </div>
      </div>
      <div className="text-dark fw-bolder text-right p-1">
        <span className="d-block">{data.name}</span>
        <span className="text-muted">
          {data.user_id ? data.user_id : data.id}
        </span>
      </div>
    </div>
  );
};
export { AccountLong };
