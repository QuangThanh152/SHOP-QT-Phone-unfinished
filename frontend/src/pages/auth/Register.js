import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { register, RESET_AUTH } from '../../redux/features/auth/authSlice'
import Loader from "../../components/loader/Loader"

const initialState = {
    name: "",
    email: "",
    password: "",
    cPassword: ""
};

const Register = () => {

    const [formData, setFormData] = useState(initialState)
    const { name, email, password, cPassword } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess } = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]:value })
    }
    
    const registerUser = async (e) => {
        e.preventDefault();
        console.log(name,email, password, cPassword)
        // Check nhập đủ ô
        if (!email || !password) {
            return toast.error("Vui lòng nhập đủ thông tin!")
        }
        // Check password tối thiểu 6 chữ
        if (password.length < 6) {
            return toast.error("Mật khẩu phải tối thiểu 6 ký tự!")
        }
        //Check tính hợp lệ của email
        if (!validateEmail(email)) {
            return toast.error("Vui lòng nhập đúng email!")
        }
        // Check password nhập đã giống nhau chưa
        if (password !== cPassword) {
            return toast.error("Mật khẩu không trùng nhau!")
        }
        const userData = {
            name,
            email,
            password,
        };
        await dispatch(register(userData));
    };

    useEffect(()=> {
        if(isSuccess && isLoggedIn) {
            //Đăng nhập đúng thì trở về trang chủ
            navigate("/");
        }
        dispatch(RESET_AUTH())
    }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
        {isLoading && <Loader />}
        <section className={`container ${styles.auth}`}>

            {/* form */}
            <Card>
                <div className={styles.form}>
                    <h2>Đăng Ký</h2>
                    {/* form login */}
                    <form onSubmit={registerUser}>
                    {/* input fields */}
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            // className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            // className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            name={"password"}
                            value={password}
                            onChange={handleInputChange}
                            // className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Nhập lại Password"
                            required
                            name="cPassword"
                            value={cPassword}
                            onChange={handleInputChange}
                            // className={styles.input}
                        />

                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Đăng Ký
                        </button>
                    </form>
                    <span className={styles.register}>
                        <p> Bạn đã có tài khoản?</p>
                        <Link to="/login">Đăng nhập</Link>
                    </span>
                </div>
            </Card>

                    {/* img */}
            <div className={styles.img}>
                <img src={registerImg} alt="Login" width="400" />
            </div>
        </section>
    </>
  )
}

export default Register