import AuthContext from "context/AuthContext"
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "firebaseApp"
import {
  ChangeEvent,
  ComponentProps,
  useContext,
  useEffect,
  useState,
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { CATEGORIES, CategoryType, PostProps } from "./PostList"

export default function PostForm() {
  const { id } = useParams()
  const [post, setPost] = useState<PostProps | null>(null)

  const getPost = async (id: string) => {
    const docRef = doc(db, "post", id)
    const docSnap = await getDoc(docRef)

    setPost({ id: docSnap.id, ...(docSnap.data() as PostProps) })
  }

  useEffect(() => {
    if (id) getPost(id)
  }, [id])

  const { user } = useContext(AuthContext)
  const naviage = useNavigate()

  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState<CategoryType | string>("")

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault()
    try {
      if (!!post) {
        const postRef = doc(db, "post", post.id as string)
        await updateDoc(postRef, {
          title,
          summary,
          content,
          category,
          updatedAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        })

        toast?.success("게시글을 수정했습니다.")
        naviage("/posts")
        return
      }

      await addDoc(collection(db, "post"), {
        title,
        summary,
        content,
        category,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        email: user?.email,
        uid: user?.uid,
      })
      toast?.success("게시글을 생성했습니다.")
      naviage("/")
    } catch (e: any) {
      console.log(e)
      toast?.error(e?.code)
    }
  }

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
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
    if (name === "category") {
      setCategory(value)
    }
  }

  useEffect(() => {
    if (!!post) {
      setTitle(post.title)
      setContent(post.content)
      setSummary(post.summary)
      setCategory(post.category as CategoryType)
    }
  }, [post])

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
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          <option value="">카테고리를 설정해주세요.</option>
          {CATEGORIES.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
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
        <input
          type="submit"
          value={!post ? "제출" : "수정"}
          className="form__btn--submit"
        ></input>
      </div>
    </form>
  )
}
