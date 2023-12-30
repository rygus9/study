import AuthContext from "context/AuthContext"
import { collection, getDocs } from "firebase/firestore"
import { db } from "firebaseApp"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface PostListProps {
  hasNavigation?: boolean
}

type TabType = "all" | "my"

export interface PostProps {
  id?: string
  title: string
  content: string
  summary: string
  email: string
  createdAt: string
}

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState<PostProps[]>([])

  const getPosts = async () => {
    const datas = await getDocs(collection(db, "post"))

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id }
      setPosts((prev) => [...prev, dataObj as PostProps])
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      {hasNavigation && (
        <div className="post__navigation">
          <div
            className={activeTab === "all" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab("my")}
          >
            전체
          </div>
          <div
            className={activeTab === "my" ? "post__navigation--active" : ""}
            onClick={() => setActiveTab("all")}
          >
            나의 글
          </div>
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
                  <div className="post__delete">삭제</div>
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
