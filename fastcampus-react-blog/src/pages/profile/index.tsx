import Footer from "components/Footer"
import Header from "components/Header"
import PostList from "components/PostList"
import Profile from "components/Profile"

export default function ProfilePage() {
  return (
    <>
      <Header></Header>
      <Profile></Profile>
      <PostList hasNavigation={false} defaultTab="my"></PostList>
      <Footer></Footer>
    </>
  )
}
