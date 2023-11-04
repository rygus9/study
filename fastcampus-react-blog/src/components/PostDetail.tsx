import { Link } from "react-router-dom"

export default function PostDetail() {
  return (
    <>
      <div className="post__detail">
        <div className="post__box">
          <div className="post__title">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
            maiores?
          </div>
          <div className="post__profile-box">
            <div className="post__profile"></div>
            <div className="post__author-name">패스트 캠퍼스</div>
            <div className="post__date">토요일</div>
          </div>
          <div className="post__utils-box">
            <div className="post__edit">
              <Link to={`/posts/edit/1`}>수정</Link>
            </div>
            <div className="post__delete">삭제</div>
          </div>
          <div className="post__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            tenetur architecto deleniti similique optio eaque nostrum at nam
            hic, dolorem nihil, nisi molestias ex vero eius ea cum. Culpa, rem!
          </div>
        </div>
      </div>
    </>
  )
}
