import { useState } from "react"
import { Link } from "react-router-dom"

interface PostListProps {
  hasNavigation?: boolean
}

type TabType = "all" | "my"

export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all")

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
        {[...Array(10)].map((e, index) => (
          <div key={index} className="post__box">
            <Link to={`/posts/${index}`}>
              <div className="post__profile-box">
                <div className="post__profile"></div>
                <div className="post__author-name">패스트 캠퍼스</div>
                <div className="post__date">토요일</div>
              </div>
              <div className="post__title">게시글 {index}</div>
              <div className="post__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                tenetur architecto deleniti similique optio eaque nostrum at nam
                hic, dolorem nihil, nisi molestias ex vero eius ea cum. Culpa,
                rem!
              </div>
              <div className="post__utils-box">
                <div className="post__edit">수정</div>
                <div className="post__delete">삭제</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
