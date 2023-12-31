import { ComponentProps, useContext, useState } from "react"
import { CommentProps, PostProps } from "./PostList"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "firebaseApp"
import AuthContext from "context/AuthContext"
import { toast } from "react-toastify"

interface CommentsProps {
  post: PostProps
  getPost: (id: string) => void
}

export default function Comments({ post, getPost }: CommentsProps) {
  const [comment, setComment] = useState("")
  const { user } = useContext(AuthContext)

  const onChange: ComponentProps<"textarea">["onChange"] = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === "comment") {
      setComment(value)
    }
  }

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault()
    try {
      if (post.id) {
        const postRef = doc(db, "post", post.id)

        if (user?.uid) {
          const commentObj = {
            uid: user.uid,
            content: comment,
            email: user.email,
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          }

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          })
        }
      }
      toast.success("댓글이 등록되었습니다.")
      setComment("")
      getPost(post.id as string)
    } catch (error: any) {
      console.log(error)
      toast.error(error?.code)
    }
  }

  const handleDeleteComment = async (data: CommentProps) => {
    const confirm = window.confirm("댓글을 삭제하겠습니까?")

    try {
      if (confirm) {
        const postRef = doc(db, "post", post.id as string)
        await updateDoc(postRef, {
          comments: arrayRemove(data),
        })
        toast.success("삭제되었습니다.")
        getPost(post.id as string)
      }
    } catch (err: any) {
      console.log(err)
      toast.error(err?.code)
    }
  }

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={onSubmit}>
        <div className="form__block">
          <label htmlFor="comment">댓글 입력</label>
          <textarea
            name="comment"
            id="comment"
            required
            value={comment}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comments__list">
        {/* slice는 원본 배열 회손 막고자 씀. */}
        {post.comments
          ?.slice(0)
          ?.reverse()
          .map((comment) => (
            <div key={comment.uid} className="comment__box">
              <div className="comment__profile-box">
                <div className="comment__email">{comment.email}</div>
                <div className="comment__date">{comment.createdAt}</div>
                {comment.uid === user?.uid && (
                  <div
                    className="comment__delete"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    삭제
                  </div>
                )}
              </div>
              <div className="comment__text">{comment.content}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
