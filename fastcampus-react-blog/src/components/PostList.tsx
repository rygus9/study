import AuthContext from "context/AuthContext"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore"
import { db } from "firebaseApp"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

interface PostListProps {
  hasNavigation?: boolean
  defaultTab?: TabType
}

type TabType = "all" | "my"

export interface PostProps {
  id?: string
  title: string
  content: string
  summary: string
  email: string
  category?: CategoryType
  createdAt: string
  updatedAt?: string
  uid?: string
}

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native"
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
]

export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab)
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState<PostProps[]>([])

  const getPosts = async () => {
    setPosts([])
    let postRef = collection(db, "post")
    let postQuery

    if (activeTab === "my") {
      postQuery = query(
        postRef,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "asc"),
      )
    } else if (activeTab === "all") {
      postQuery = query(postRef, orderBy("createdAt", "asc"))
    } else {
      postQuery = query(
        postRef,
        where("category", "==", activeTab),
        orderBy("createdAt", "asc"),
      )
    }

    const datas = await getDocs(postQuery)

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id }
      setPosts((prev) => [...prev, dataObj as PostProps])
    })
  }

  useEffect(() => {
    getPosts()
  }, [activeTab])

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("게시글을 삭제하겠습니까?")
    if (confirm && id) {
      await deleteDoc(doc(db, "post", id))
      toast.success("게시글을 삭제했습니다.")
      getPosts()
    }
  }

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            className={activeTab === "all" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab("all")}
          >
            전체
          </div>
          <div
            className={activeTab === "my" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab("my")}
          >
            나의 글
          </div>
          {CATEGORIES.map((category) => (
            <div
              className={
                activeTab === category ? "post__navigation--active" : ""
              }
              onClick={() => setActiveTab(category)}
              key={category}
            >
              {category}
            </div>
          ))}
        </div>
      )}
      <div className="post__list">
        {posts.length > 0 ? (
          posts.map(({ id, email, createdAt, title, summary }) => (
            <div key={id} className="post__box">
              <Link to={`/posts/${id}`}>
                <div className="post__profile-box">
                  <div className="post__profile"></div>
                  <div className="post__author-name">{email}</div>
                  <div className="post__date">{createdAt}</div>
                </div>
                <div className="post__title">{title}</div>
                <div className="post__text">{summary}</div>
              </Link>

              {email === user?.email && (
                <div className="post__utils-box">
                  <div
                    className="post__delete"
                    onClick={() => handleDelete(id as string)}
                  >
                    삭제
                  </div>
                  <div className="post__edit">
                    <Link to={`/posts/edit/${id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="post__no-post">게시글이 없습니다.</div>
        )}
      </div>
    </>
  )
}
