import { useState } from "react";
import styles from "./Register.module.css";
import Sms from "./Sms";
import swal from "sweetalert";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth-validation";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const signUp = async () => {
    
    if(!name.trim()){
      return showSwal("نام را وارد کنید","error","تلاش مجدد");
    }

    const isValidPhone = validatePhone(phone);
    if(!isValidPhone){
      return showSwal("شماره تماس وارد شده معتبر نیست","error","تلاش مجدد")
    }

    if(email){
      const isValidEmail = validateEmail(email);
      if(!isValidEmail) {
          return showSwal(" ایمیل وارد شده معتبر نیست","error","تلاش مجدد")
      }
    }

    const isValidPassword = validatePassword(password);
    if(!isValidPassword){
        return showSwal("پسوورد وارد شده معتبر نیست","error","تلاش مجدد")
    }
    
    const user = {name, phone, email, password};

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      }, 
      body: JSON.stringify(user)
    });

    if(res.status === 201){
      showSwal("ثبت نام با موفقیت انجام شد","success","ورود به پنل کاربری");
    } else if (res.status === 422) {
      showSwal("کاربری با این اطلاعات وجود دارد","error","تلاش مجدد")
    }
    
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              className={styles.input}
              type="text"
              placeholder="نام"
            />
            <input
              value={phone}
              onChange={event => setPhone(event.target.value)}
              className={styles.input}
              type="text"
              placeholder="شماره موبایل  "
              F
            />
            <input
              value={email}
              onChange={event => setEmail(event.target.value)}
              className={styles.input}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />

            {isRegisterWithPass && (
              <input
                value={password}
                onChange={event => setPassword(event.target.value)}
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />
            )}

            <p
              onClick={() => setIsRegisterWithOtp(true)}
              style={{ marginTop: "1rem" }}
              className={styles.btn}
            >
              ثبت نام با کد تایید
            </p>
            <button
              onClick={() => {
                if(isRegisterWithPass){
                  signUp()
                } else {
                  setIsRegisterWithPass(true)
                }
                }}
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
