import { useContext, useEffect, useState } from "react";
import "../css/CreateForum.css"
import axios from "axios";
import REACT_APP_API from "../../env";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { deleteUser, getUser } from "../../services/authorize";

export default function CreateForum() {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [state, setState] = useState({
        title: "",
        author: user?.username
    });
    const { title, author } = state;
    const submitContent = (e) => {
        setContent(e);
    }
    const inputValue = (name) => (event) => {
        setState({ ...state, [name]: event.target.value });
    }
    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${REACT_APP_API}/api/create`, { ...state, content }).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'บันทึกบทความสำเร็จ'
            }).then(res => {
                if (res.isConfirmed || res.isDismissed) navigate("/forums");
            })
        }).catch(err => {
            if(err.response.data.notCookie){
                deleteUser();
                navigate(0);
            }
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: err.response.data.error
            })
        })
    }
    return (
        <div className="create-form-container">
            <form onSubmit={submitForm} className="form-container">
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" maxLength={35} value={title} onChange={inputValue("title")} />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        style={{ border: '2px solid #000' }}
                    />                </div>
                <div className="form-group">
                    <label>ผู้เขียน</label>
                    <input disabled type="text" value={author} onChange={inputValue("author")} />
                </div>
                <button type="submit">บันทึก</button>
            </form>
        </div>
    )
}