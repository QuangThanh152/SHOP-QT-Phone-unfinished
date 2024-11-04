import React, { useEffect, useState } from "react";
import { sliderData} from "./slider-data"
import "./Slider.scss"
import { useNavigate } from "react-router-dom";

// import icon
import { AiOutlineRightCircle } from "react-icons/ai";
import { AiOutlineLeftCircle } from "react-icons/ai";
const Slider = () => {

    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    // lấy tổng số slide
    const slideLength = sliderData.length;
    const autoScroll = true;
    let slideInterval;
    const intervalTime = 5000;

    // xử lý nút next slide
    const nextSlide = () => {
        // vì slide đầu tiên ở [0] nên (slideLength - 1) là cuối
        // ktra nếu đúng currentSlide sẽ trở về vị trí [0] (? 0)
        // nếu sai thì currentSlide sẽ tăng lên 1(chuyển đến trang kế tiếp)(currentSlide + 1)
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }
    // xử lý nút trở về trước slide
    const prevSlide = () => {
        //Kiểm tra điều kiện: currentSlide === 0
        //Nếu đúng: Slide hiện tại là slide đầu tiên.
        //  Khi đó, nó sẽ đặt currentSlide trở thành slide cuối cùng (tức là slideLength - 1).
        //  Nếu sai: Không phải slide đầu, thì nó sẽ giảm currentSlide đi 1 (quay về slide trước đó).
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }

    useEffect(() => {
        setCurrentSlide(0)
    }, [])

    useEffect(() => {
        if ( autoScroll ) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime);
            }
            auto();
        }
        return () => {
            clearInterval(slideInterval);
        }
    }, [currentSlide, intervalTime, autoScroll])

  return (
        <div className='slider'>
            <AiOutlineLeftCircle size={30} className="arrow prev" onClick={prevSlide} />
            <AiOutlineRightCircle size={30} className="arrow next" onClick={nextSlide} />

            {sliderData.map((slide, index) => {
                const { image, heading, desc } = slide

                return (
                    <div key={index} className={index === currentSlide ? "slide current" : "slide"} >
                        {index === currentSlide && (
                            <>
                                <img src={image} alt="slide" />
                                <div className="content" >
                                    <span className="span1"></span>
                                    <span className="span2"></span>
                                    <span className="span3"></span>
                                    <span className="span4"></span>
                                    <h2>{heading}</h2>
                                    <p>{desc}</p>
                                    <hr />
                                    <button className="--btn --btn-primary" onClick={() => navigate("/shop")}>
                                        Shop Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )
            })
            }
        </div>   
  )
}

export default Slider