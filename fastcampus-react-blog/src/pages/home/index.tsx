import Carousel from "components/Carousel"
import Footer from "components/Footer"
import Header from "components/Header"
import PostList from "components/PostList"

export default function HomePage() {
  return (
    <div>
      <Header></Header>
      <Carousel></Carousel>
      <PostList></PostList>
      <Footer></Footer>
    </div>
  )
}
