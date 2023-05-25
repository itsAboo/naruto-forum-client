import CarouselSlider from "./components/CarouselSlider"
import "./css/App.css"
import narutoPic from "./assets/naruto-cha.png"
import sakuraPic from "./assets/sakura-cha.png"
import sasukePic from "./assets/sasuke-cha.png"
import konoha from "./assets/konoha.jpg"
import { Link } from "react-router-dom"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <CarouselSlider />
      <div className="d-flex">
        <div className="app-container">
          <section className="summary">
            <div className="summary-header">
              <h1>เนื้อเรื่องย่อ</h1>
            </div>
            <div className="summary-content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellat accusamus fuga nulla exercitationem earum, nisi modi? Dolores at eius dolorem voluptatem veniam magnam dolore officia, eos delectus recusandae velit odit consequuntur repellendus tempore asperiores optio veritatis perspiciatis nihil, error ratione? Hic voluptates, tenetur nulla, est exercitationem dicta, quibusdam maxime commodi itaque velit officiis ipsam dolorum in sit porro eligendi quidem. Quis odit ratione magnam ad cum distinctio nostrum quo.</p>
            </div>
          </section>
          <section className="review-characther">
            <div className="characther-box">
              <div className="characther-content">
                <h1>อุสึมากิ นารูโตะ</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam beatae nisi atque non rem vel vero delectus dolorem sed blanditiis.</p>
              </div>
              <div className="characther-img">
                <img src={narutoPic} alt="narutoPic" />
              </div>
            </div>
            <div className="m-box">
              <div className="characther-content">
                <h1>อุจิวะ ซาสึเกะ</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam beatae nisi atque non rem vel vero delectus dolorem sed blanditiis.</p>
              </div>
              <div className="characther-img">
                <img src={sasukePic} alt="narutoPic" />
              </div>
            </div>
            <div className="characther-box">
              <div className="characther-content">
                <h1>ฮารุโนะ ซากุระ</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam beatae nisi atque non rem vel vero delectus dolorem sed blanditiis.</p>
              </div>
              <div className="characther-img">
                <img src={sakuraPic} alt="narutoPic" />
              </div>
            </div>
          </section>
          <section className="end-of-page">
            <div className="end-img">
              <img className="konoha-img" src={konoha} alt="konoha" />
            </div>
            <div className="end-link">
              <Link to="/forums">อ่านบทความ</Link>
            </div>
          </section>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default App
