import { Link } from "react-router-dom"

export default function SignupForm() {
  return (
    <form action="/post" method="post" className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="text" id="email" name="email" required />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="text" id="password" name="password" required />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="text"
          id="password_confirm"
          name="password_confirm"
          required
        />
      </div>
      <div className="form_block">
        계정이 이미 있으신가여?
        <Link to="/login" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input
          type="submit"
          value="로그인"
          className="form__btn--submit"
        ></input>
      </div>
    </form>
  )
}
