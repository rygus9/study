import Footer from "components/Footer"
import Header from "components/Header"
import PostList from "components/PostList"

export default function PostListPage() {
  return (
    <>
      <Header></Header>
      <PostList hasNavigation={false}></PostList>
      <Footer></Footer>
    </>
  )
}
