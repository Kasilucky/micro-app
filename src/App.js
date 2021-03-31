import React from "react";
import "./App.css";

const App = () => {
  const [data, setData] = React.useState([]);
  const [item, setItem] = React.useState({});
  const URL =
    "https://api.stackexchange.com/2.2/search/advanced?page=1&pagesize=20&order=desc&sort=activity&site=stackoverflow";

  React.useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        setData(res.items);
      })
      .catch((err) => console.log("failed to fetch data Err::", err));
  }, []);

  const onSetItem = (obj) => {
    setItem(obj);
  };

  return (
    <div className="App container">
      <h1>StackOverflow Rail</h1>
      <table className="table table-hover">
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3">Loading..</td>
            </tr>
          ) : (
            <>
              {data.map((item, index) => {
                return (
                  <tr
                    key={index}
                    id="openModal"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => onSetItem(item)}
                  >
                    <td>{item.owner.display_name}</td>
                    <td>{item.title}</td>
                    <td>{item.creation_date}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body d-flex justify-content-start flex-column align-items-start">
              <p>{item.title ? item.title : ""}</p>
              <a href={item.link ? item.link : "#"} target="_blank">
                Open in New Tab
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
