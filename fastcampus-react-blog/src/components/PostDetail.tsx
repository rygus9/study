import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PostProps } from "./PostList"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { db } from "firebaseApp"
import Loader from "./Loader"
import AuthContext from "context/AuthContext"
import { toast } from "react-toastify"
import Comments from "./Comments"

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [post, setPost] = useState<PostProps | null>(null)
  const navigate = useNavigate()

  const getPost = async (id: string) => {
    const docRef = doc(db, "post", id)
    const docSnap = await getDoc(docRef)

    setPost({
      id: docSnap.id,
      ...(docSnap.data() as PostProps),
    })
  }

  useEffect(() => {
    if (id) {
      getPost(id)
    }
  }, [id])

  const handleDelete = async () => {
    const confirm = window.confirm("해당 게시글을 삭제하겠습니까?")
    if (confirm && post && post.id) {
      await deleteDoc(doc(db, "post", post.id))
      toast.success("게시글 성공하였습니다.")
      navigate("/")
    }
  }

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__title">{post.title}</div>
              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div className="post__author-name">{post.email}</div>
                <div className="post__date">{post.createdAt}</div>
              </div>
              {(user?.email === post.email || post.category) && (
                <div className="post__utils-box">
                  {post.category && (
                    <div className="post__category">{post.category}</div>
                  )}
                  {user?.email === post.email && (
                    <>
                      <div
                        className="post__delete"
                        role="presentation"
                        onClick={handleDelete}
                      >
                        삭제
                      </div>
                      <div className="post__edit">
                        <Link to={`/posts/edit/${id}`}>수정</Link>
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="post__text post__text--prewrap">
                {post.content}
              </div>
            </div>
            <Comments post={post} getPost={getPost}></Comments>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  )
}
