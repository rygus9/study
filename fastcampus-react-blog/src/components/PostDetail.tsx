import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { PostProps } from "./PostList"
import { doc, getDoc } from "firebase/firestore"
import { db } from "firebaseApp"
import Loader from "./Loader"
import AuthContext from "context/AuthContext"

export default function PostDetail() {
  const params = useParams()
  const { user } = useContext(AuthContext)
  const [post, setPost] = useState<PostProps | null>(null)

  const getPost = async (id: string) => {
    const docRef = doc(db, "post", id)
    const docSnap = await getDoc(docRef)

    setPost({
      id: docSnap.id,
      ...(docSnap.data() as PostProps),
    })
  }

  useEffect(() => {
    if (params?.id) {
      getPost(params.id)
    }
  }, [params?.id])

  const handleDelete = () => {
    console.log("delete")
  }

  return (
    <>
      <div className="post__detail">
        {post ? (
          <div className="post__box">
            <div className="post__title">{post.title}</div>
            <div className="post__profile-box">
              <div className="post__profile"></div>
              <div className="post__author-name">{post.email}</div>
              <div className="post__date">{post.createdAt}</div>
            </div>
            {user?.email === post.email && (
              <div className="post__utils-box">
                <div
                  className="post__delete"
                  role="presentation"
                  onClick={handleDelete}
                >
                  삭제
                </div>
                <div className="post__edit">
                  <Link to={`/posts/edit/1`}>수정</Link>
                </div>
              </div>
            )}
            <div className="post__text post__text--prewrap">{post.content}</div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  )
}
