import "./Add.scss";
const Add = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    //add new item

    const formData = {};
    document.querySelectorAll(".item input").forEach((input) => {
      formData[input.placeholder] = input.value;
    });

    // Prepare the data for the POST request
    const postData = JSON.stringify(formData);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/${props.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: postData,
        }
      );

      const data = await response.json();

      if (data.status !== "success") {
        // throw new Error("Failed to login");
        // alert(data.message);
      }
      console.log(data);
    } catch (error) {
      console.error("Error during signup:", error);
      throw error;
    }
  };

  return (
    <div className="add">
      <div className="modal p-5 ">
        <span
          className="close text-stone-50"
          onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns &&
            props.columns
              .filter(
                (item) =>
                  item.field !== "id" &&
                  item.field !== "img" &&
                  item.field !== "_id" &&
                  item.field !== "imageURL"
              )
              .map((column) => (
                <div className="item">
                  <label>{column.headerName}</label>
                  <input type={column.type} placeholder={column.field} />
                </div>
              ))}
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg my-5 py-8">
            Add {`${props.slug}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
