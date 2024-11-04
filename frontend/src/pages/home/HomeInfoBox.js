import React from 'react'
import "./Home.scss"

// import icon
import {FaShippingFast} from "react-icons/fa"
import {BsFillCreditCardFill} from "react-icons/bs"
import {BsCartCheck} from "react-icons/bs"
import {BsClockHistory} from "react-icons/bs"
//  data test
const data = [
  {
    icon: <FaShippingFast size={30} color="#8cb4f5" />,
    heading: "Free Shipping",
    text: "Chúng tôi cung cấp dịch vụ giao hàng miễn phí",
  },
  {
    icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
    heading: "Secure Payment",
    text: "Thanh toán an toàn cho sản phẩm của bạn.",
  },
  {
    icon: <BsCartCheck size={30} color="#fa82ea" />,
    heading: "Quality Products",
    text: "Cam kết chỉ bán những sản phẩm chất lượng.",
  },
  {
    icon: <BsClockHistory size={30} color="#82fa9e" />,
    heading: "24/7 Support",
    text: "Dịch vụ chăm sóc khách hàng luôn hoạt động 24/7.",
  },
];


const HomeInfoBox = () => {
  return (
    <div className="infoboxes --mb2">
        {data.map((item, index) => {
            const {icon, heading, text} = item
            return (
                <div className="infobox" key={index}>
                    <div className="icon">
                        {icon}
                    </div>
                    <div className='text'>
                        <h4 > {heading} </h4>
                        <p className="--text-sm">{text}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default HomeInfoBox