import AuthContext from "context/AuthContext"
import { addDoc, collection } from "firebase/firestore"
import { db } from "firebaseApp"
import { ChangeEvent, ComponentProps, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function PostForm() {
  const { user } = useContext(AuthContext)
  const naviage = useNavigate()

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "post"), {
        title,
        summary,
        content,
        createdAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      })
      toast?.success("게시글을 생성했습니다.")
      naviage("/")
    } catch (e: any) {
      console.log(e)
      toast?.error(e?.code)
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e

    if (name === "title") {
      setTitle(value)
    }
    if (name === "summary") {
      setSummary(value)
    }
    if (name === "content") {
      setContent(value)
    }
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          type="text"
          id="summary"
          name="summary"
          required
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          required
          onChange={onChange}
          value={content}
        />
      </div>
      <div className="form__block">
        <input type="submit" value="제출" className="form__btn--submit"></input>
      </div>
    </form>
  )
}
