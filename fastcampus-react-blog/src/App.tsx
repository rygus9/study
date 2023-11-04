import "./App.css"
import { Link, Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/posts/:id">Posts Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">Posts New</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Posts Update</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<h1>메인</h1>} />
        <Route path="/posts" element={<h1>포스트</h1>} />
        <Route path="/posts/:id" element={<h1>포스트 디테일</h1>} />
        <Route path="/posts/new" element={<h1>포스트 생성</h1>} />
        <Route path="/posts/edit/:id" element={<h1>포스트 수정</h1>} />
        <Route path="/profile" element={<h1>프로필</h1>} />
        <Route path="*" element={<Navigate replace to="/"></Navigate>}></Route>
      </Routes>
    </>
  )
}

export default App
