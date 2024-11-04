import React, { useEffect, useState } from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import Card from "../../components/card/Card"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { login, RESET_AUTH } from '../../redux/features/auth/authSlice'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, isLoggedIn, isSuccess } = useSelector(
        (state) => state.auth
    );
    const loginUser = async (e) => {
        e.preventDefault();
        console.log(email, password)
        // Check nhập đủ ô
        if (!email || !password) {
            return toast.error("Vui lòng nhập đủ thông tin!")
        }

        //Check tính hợp lệ của email
        if (!validateEmail(email)) {
            return toast.error("Vui lòng nhập đúng email!")
        }

        const userData = {
            email,
            password,
        };
        console.log(userData)
        await dispatch(login(userData))
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
            {/* img */}
            <div className={styles.img}>
                <img src={loginImg} alt="Login" width="400" />
            </div>
            {/* form */}
            <Card>
                <div className={styles.form}>
                    <h2>Đăng Nhập</h2>
                    {/* form login */}
                    <form onSubmit={loginUser}>
                    {/* input fields */}
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // className={styles.input}
                        />

                        <button type="submit" className="--btn --btn-primary --btn-block">
                            Đăng Nhập
                        </button>
                    </form>
                    <span className={styles.register}>
                        <p>Bạn chưa có tài khoản? </p>
                        <Link to="/register">Đăng ký</Link>
                    </span>
                </div>
            </Card>
        </section>
    </>
  )
}

export default Login