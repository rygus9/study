import { Navigate, Route, Routes } from "react-router-dom"
import ProfilePage from "pages/profile"
import LoginPage from "pages/login"
import SignupPage from "pages/signup"
import PostListPage from "pages/posts"
import HomePage from "pages/home"
import PostDetailPage from "pages/posts/detail"
import PostNewPage from "pages/posts/new"
import PostEditPage from "pages/posts/edit"
import { useState } from "react"

interface RouterProps {
  isAuthenticated: boolean
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/posts" element={<PostListPage></PostListPage>} />
          <Route
            path="/posts/:id"
            element={<PostDetailPage></PostDetailPage>}
          />
          <Route path="/posts/new" element={<PostNewPage></PostNewPage>} />
          <Route
            path="/posts/edit/:id"
            element={<PostEditPage></PostEditPage>}
          />
          <Route path="/profile" element={<ProfilePage></ProfilePage>} />
          <Route
            path="*"
            element={<Navigate replace to="/"></Navigate>}
          ></Route>
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route
            path="*"
            element={<Navigate replace to="/login"></Navigate>}
          ></Route>
        </>
      )}
    </Routes>
  )
}
