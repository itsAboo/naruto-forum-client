import { Link, useNavigate } from "react-router-dom";
import "../css/LoginPage.css"
import { useContext, useState } from "react";
import logo from "../assets/naruto-logo.png"
import axios from "axios";
import REACT_APP_API from "../../env";
import Swal from "sweetalert2";
import { UserContext } from "../contexts/UserContext";

export default function CreateAccount() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    const [inputType, setInputType] = useState("password");
    const [hidden, setHidden] = useState("hidden");
    const [visible, setVisible] = useState("visible");
    const [alertDisplay, setAlertDisplay] = useState("none");
    const [alertTxt, setAlertTxt] = useState("");
    const [alertBorder, setAlertBorder] = useState("alert-border");
    const toggleEye = () => {
        setHidden(visible);
        setVisible(hidden);
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password")
        }
    }
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const submitRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${REACT_APP_API}/api/register`, { username, password });
            Swal.fire({
                icon : 'success',
                title : 'สำเร็จ',
                text : data.msg
            }).then(res=>{
                if(res.isConfirmed || res.dismiss){
                    navigate('/login');
                }
            })
        } catch (err) {
            setAlertBorder("2px solid #FF0000")
            setAlertDisplay("block");
            setAlertTxt(err.response.data.msg);
        }
    }
    return (
        <div className="login-page-container">
            <div className="login-container">
                <form className="login-form" onSubmit={submitRegister}>
                    <div className="logo-box">
                        <img className="logo" src={logo} alt="" />
                        <h1>สมัครสมาชิก</h1>
                    </div>
                    <div className="login-form-group">
                        <label>ชื่อผู้ใช้</label>
                        <input type="text" style={{ border: `${alertBorder}` }} onChange={(e) => {
                            setUsername(e.target.value)
                            setAlertBorder("")
                            setAlertDisplay("none")
                            }} />
                    </div>
                    <div className="alert-box" style={{ display: `${alertDisplay}` }}>
                        <p className="alert-text">{alertTxt}</p>
                    </div>
                    <div className="login-form-group" id="pw-box">
                        <label>รหัสผ่าน</label>
                        <input type={inputType} onChange={(e) => {
                            setPassword(e.target.value)
                            setAlertBorder("")
                            setAlertDisplay("none")
                            }} />
                        <div onClick={toggleEye} className="eye-box"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`eye ${hidden}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`eye ${visible}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </div>
                    </div>
                    <p>มีบัญชีอยู่แล้ว <Link className="login-link" to={"/login"}>เข้าสู่ระบบ</Link></p>
                    <button type="submit">สมัครสมาชิก</button>
                </form>
            </div>
        </div>
    )
}