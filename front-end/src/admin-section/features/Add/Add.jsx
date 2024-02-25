import "./Add.scss";
const Add = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //add new item
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns &&
            props.columns
              .filter((item) => item.field !== "id" && item.field !== "img")
              .map((column) => (
                <div className="item">
                  <label>{column.headerName}</label>
                  <input type={column.type} placeholder={column.field} />
                </div>
              ))}
        </form>
      </div>
    </div>
  );
};

export default Add;
