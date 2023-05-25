import axios from "axios";
import { useContext, useEffect, useState } from "react";
import REACT_APP_API from "../../env";
import { LoadingContext, LoadingIcon } from "../contexts/LoadingContext";
import "../css/ForumsPage.css";
import { Link, useNavigate } from "react-router-dom";
import { Parser } from "html-to-react";
import { UserContext } from "../contexts/UserContext";
import Swal from "sweetalert2";

export default function ForumsPage() {
  const [forums, setForums] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [forumsPerPage] = useState(10);
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoadingContext);
  const { user } = useContext(UserContext);
  const [searchKeyword,setSearchKeyword] = useState("");
  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(`${REACT_APP_API}/api/forums`)
      .then((res) => {
        setIsLoading(false);
        setForums(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };
  const handleDeleteAndEditBtn = (author) => {
    if (user.username === author) {
      return true;
    } else {
      return false;
    }
  };
  const deleteForum = async (username, forumId) => {
    try {
      const response = await axios.post(`${REACT_APP_API}/api/deletebyuser`, {
        username,
        forumId,
      });
      return response.data.msg;
    } catch (err) {
      return err.response.data.msg;
    }
  };
  const handleDelete = (author, forumId) => {
    Swal.fire({
      showCancelButton: true,
      showCloseButton: true,
      title: "คุณต้องการลบบทความนี้หรือไม่",
      icon: "warning",
      text: "หากลบแล้ว จะไม่สามารถกู้คืนได้",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteForum(author, forumId).then((msg) => {
          Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: msg,
          }).then((res) => {
            if (res.isConfirmed || res.isDismissed) {
              navigate(0);
            }
          });
        });
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  //คำนวณหน้าเริ่มต้นและหน้าสุดท้ายของบทความในแต่ละหน้า
  const indexOfLastForum = currentPage * forumsPerPage;
  const indexOfFirstForum = indexOfLastForum - forumsPerPage;
  const currentForums = forums.slice(indexOfFirstForum, indexOfLastForum);
  //JSX forums
  const forumItems = currentForums.map((forum, index) => (
    <div key={index} className="link-container">
      <Link to={`/forum/${forum.uuid}`}>
        <div className="forum">
          <h1 className="forum-title">{forum.title.substring(0, 35)}</h1>
          <p className="forum-author">
            {new Date(forum.createdAt).toLocaleString()} , {forum.author}
          </p>
        </div>
      </Link>
      {handleDeleteAndEditBtn(forum.author) && (
        <div className="edit-delete-container">
          <Link to={`/edit/${forum.uuid}`} className="edit-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="edit-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
          <Link
            className="delete-link"
            onClick={() => handleDelete(user.username, forum._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={5}
              stroke="currentColor"
              className="x-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  ));
  // คำนวณจำนวนหน้าทั้งหมด
  const totalpages = Math.ceil(forums.length / forumsPerPage);
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalpages) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };
  const handleSubmitSearch = ()=>{
    navigate(`/forums/${searchKeyword}`)
  }
  return (
    <>
      <LoadingIcon />
      <div className="create-container">
        <div className="search-bar-box">
          <form onSubmit={handleSubmitSearch}>
            <input
              type="text"
              className="search-bar"
              placeholder="ค้นหาบทความ"
              value={searchKeyword}
              onChange={(event)=>setSearchKeyword(event.target.value)}
            />
            <button
              type="submit"
              style={{
                margin: 0,
                backgroundColor: "transparent",
                position: "absolute",
                right: "2%",
                top:"0%",
                color:"black"
              }}
              className="material-symbols-outlined search-icon"
            >
              search
            </button>
          </form>
        </div>
        {user && (
          <Link className="link-group create-btn" to={"/create"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="create-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>{" "}
            <span>เขียนบทความ</span>
          </Link>
        )}
      </div>
      <div className="forumpage-container">
        <div className="forum-container">
          {forumItems}
          <div className="pagination">
            <button
              className="prev-btn"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <span className="pagination-center">
              หน้า {currentPage} จากทั้งหมด {totalpages}
            </span>
            <button
              className="next-btn"
              onClick={nextPage}
              disabled={currentPage === totalpages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
