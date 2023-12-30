import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { app } from "firebaseApp"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function SignupForm() {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const auth = getAuth(app)
      await createUserWithEmailAndPassword(auth, email, password)

      toast.success("회원가입에 성공했습니다.")
      navigate("/")
    } catch (err: any) {
      console.log(err)
      toast.error(err?.code)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        setError("비밀번호는 8자리 이상 넣어주세요.")
      } else if (passwordConfirm.length > 0 && value !== passwordConfirm) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다.")
      } else {
        setError("")
      }
    }

    if (name === "passwordConfirm") {
      setPasswordConfirm(value)

      if (value !== password) {
        setError("비밀번호와 값이 다릅니다.")
      } else {
        setError("")
      }
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      action="/post"
      method="post"
      className="form form--lg"
    >
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          onChange={onChange}
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
        />
      </div>
      <div className="form__block">
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          required
          onChange={onChange}
        />
      </div>
      {error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form_block">
        계정이 이미 있으신가여?
        <Link to="/login" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="회원가입"
          className="form__btn--submit"
          disabled={error.length > 0}
        ></input>
      </div>
    </form>
  )
}
