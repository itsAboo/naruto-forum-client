import { useEffect, useState } from "react"
import banner1 from "../assets/banner-1.jpg"
import banner2 from "../assets/banner-2.jpg"
import banner3 from "../assets/banner-3.jpg"
import "../css/CarouselSlider.css"

export default function CarouselSlider() {
    const images = [banner1, banner2, banner3]
    const totalImages = images.length;   
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
        setCurrentIndex(currentIndex === totalImages - 1 ? 0 : currentIndex + 1);
    }
    const handlePrev = () => {
        setCurrentIndex(currentIndex === 0 ? totalImages - 1 : currentIndex - 1);
    }
    const handleIndicator = (index)=>{
        setCurrentIndex(index);
    }
    useEffect(() => {
        const interval = setInterval(() => {
          handleNext();
        }, 5000);
        return () => clearInterval(interval);
      }, [currentIndex]);

    return (
        <div className="carousel">
            <button className="carousel-btn carousel-btn-left" onClick={handlePrev}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            
            <div className="carousel-track-container">
                <ul className="carousel-track">
                    {images.map((image,index) => (
                        <li key={index} className="carousel-slide">
                            <img className={`carousel-image${index === currentIndex ? " img-active" : ""}`} 
                            src={image} alt="image" />
                        </li>
                    ))}
                </ul>
            </div>

            <button className="carousel-btn carousel-btn-right" onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            <div className="carousel-nav">
                {images.map((image,index)=>(
                    <button id="indy-btn" key={index} 
                        className={`carousel-indicator ${index === currentIndex ? "current-slide" : ""}`}
                        onClick={()=>handleIndicator(index)}>                       
                    </button>                   
                ))}
            </div>
        </div>
    )
}