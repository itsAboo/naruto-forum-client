import { useContext, useEffect, useState } from "react";
import "../css/CreateForum.css";
import axios from "axios";
import REACT_APP_API from "../../env";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { deleteUser, getUser } from "../../services/authorize";
import { LoadingContext, LoadingIcon } from "../contexts/LoadingContext";

export default function EditForum() {
  const { user } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [state, setState] = useState({
    title: "",
    author: user?.username,
  });
  const fetchData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`${REACT_APP_API}/api/forum/${uuid}`);
    setState((prevState) => {
      return { ...prevState, title: data.title };
    });
    setContent(data.content);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { title, author } = state;
  const submitContent = (e) => {
    setContent(e);
  };
  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${REACT_APP_API}/api/edit/${uuid}`,{...state,content});
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: response.data.msg,
      }).then((res) => {
        if (res.isConfirmed || res.isDismissed) {
          navigate(-1);
        }
      });
    } catch (err) {
      if (err) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: err.response.data.msg,
        });
      }
    }
  };
  return (
    <div className="create-form-container">
      <LoadingIcon />
      <form onSubmit={submitForm} className="form-container">
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            maxLength={35}
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียด</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            style={{ border: "2px solid #000" }}
          />{" "}
        </div>
        <div className="form-group">
          <label>ผู้เขียน</label>
          <input
            disabled
            type="text"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <button type="submit">บันทึก</button>
        <Link to={-1} className="btn-cancle">
          ยกเลิก
        </Link>
      </form>
    </div>
  );
}
