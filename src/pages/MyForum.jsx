import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { LoadingContext, LoadingIcon } from "../contexts/LoadingContext";
import axios from "axios";
import REACT_APP_API from "../../env";
import { deleteUser } from "../../services/authorize";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function MyForum() {
  const { user } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);
  const fetchForumByAuthor = async () => {
    setIsLoading(true);
    try {
      const forumDoc = await axios.post(`${REACT_APP_API}/api/myforum`, {
        author: user.username,
      });
      if (forumDoc) {
        setForums(forumDoc.data);
      } else {
        setForums(null);
      }
    } catch (err) {
      if (err) {
        deleteUser();
        navigate(0);
      }
    }
    setIsLoading(false);
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
    fetchForumByAuthor();
  }, []);
  return (
    <div style={{ marginTop: "70px" }}>
      <LoadingIcon />
      <div className="forumpage-container">
        <div className="forum-container">
          {!forums && (
            <div>
              <p>
                คุณยังไม่มีบทความ &gt;&gt;&gt;{" "}
                <Link to={"/create"} style={{ color: "#5F9DF7" }}>
                  เขียนบทความ
                </Link>{" "}
              </p>
            </div>
          )}
          {forums &&
            forums.map((forum, index) => (
              <div key={index} className="link-container">
                <Link to={`/forum/${forum.uuid}`}>
                  <div className="forum">
                    <h1 className="forum-title">
                      {forum.title.substring(0, 35)}
                    </h1>
                    <p className="forum-author">
                      {new Date(forum.createdAt).toLocaleString()} ,{" "}
                      {forum.author}
                    </p>
                  </div>
                </Link>
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
