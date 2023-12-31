import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "firebaseApp"
import { ComponentProps, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function LoginForm() {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [passwoard, setPassword] = useState("")
  const navigate = useNavigate()

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth(app)
      await signInWithEmailAndPassword(auth, email, passwoard)

      toast.success("성공했습니다.")
      navigate("/")
    } catch (err: any) {
      toast.error(err?.code)
      console.log(err)
    }
  }

  const onChange: ComponentProps<"input">["onChange"] = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === "email") {
      setEmail(value)

      const validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

      if (!value?.match(validRegex)) {
        setError("이메일 형식이 맞지 않는다.")
      } else {
        setError("")
      }
    }

    if (name === "password") {
      setPassword(value)

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상으로 입력해주세요.")
      } else {
        setError("")
      }
    }
  }

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          onChange={onChange}
          value={email}
        />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={onChange}
          value={passwoard}
        />
      </div>
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form_block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn--submit"
          disabled={error?.length > 0}
        ></input>
      </div>
    </form>
  )
}
