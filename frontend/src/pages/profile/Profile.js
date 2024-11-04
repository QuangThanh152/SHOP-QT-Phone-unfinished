import React, { useEffect, useState } from 'react'
import "./Profile.scss";
import PageMenu from '../../components/pageMenu/PageMenu';
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card"
import { getUser, updatePhoto, updateUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

import { RiUploadCloud2Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { shortenText } from '../../utils';

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
// const folder_name = "ShopQt_app-Photo";
const url = "https://api.cloudinary.com/v1_1/qthanhcloud/image/upload";

// console.log(cloud_name, upload_preset);

const Profile = () => {
  const {  isLoading , user } = useSelector(
    (state) => state.auth
  );

  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: user?.address || {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  }

  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setaImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect( () => {
    if (user === null ) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  useEffect( () => {
    if (user) {
      setProfile( {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "",
        photo: user?.photo || "",
        address: user?.address || {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      } )
    }
  }, [dispatch, user]);

  
  // xử lý handleInputChange
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile({ ...profile, [name]: value})
  // }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "address" || name === "state" || name === "country") {
      setProfile({
        ...profile,
        address: {
          ...profile.address,  // Bảo toàn các giá trị khác trong address
          [name]: value,  // Cập nhật giá trị mới cho address, state, hoặc country
        },
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };
  
  // xử lý handleImageChange
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setaImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  // xử lý saveProfile
  const saveProfile = async (e) => {
    e.preventDefault();

    const userData = {
      name: profile.name,
      phone: profile.phone,
      address: {
        address: profile.address.address,
        state: profile.address.state,
        country: profile.address.country,
      },
    }
    console.log(userData);
    await dispatch(updateUser(userData)); 
  }

  // save photo
  const savePhoto = async (e) => {
    e.preventDefault();
    let imageURL;
  
    try {
      if (profileImage && (profileImage.type === "image/jpeg" || profileImage.type === "image/png")) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset); // chỉ cần upload_preset
  
        // Gửi yêu cầu POST tới Cloudinary
        const response = await fetch(url, {
          method: "POST",
          body: image,
        });
  
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        // Kiểm tra nếu upload thành công
        if (imgData.secure_url) {
          imageURL = imgData.secure_url;
          console.log("Uploaded image URL:", imageURL);
  
          // Cập nhật URL ảnh trong MongoDB
          const userData = {
            photo: profileImage ? imageURL : profile.photo
          };
          
          await dispatch(updatePhoto(userData));  // Lưu URL ảnh vào MongoDB
          setaImagePreview(null);  // Đặt lại preview
        } else {
          toast.error("Cập nhật ảnh thất bại!");
        }
      } else {
        toast.error("Hãy cập nhật ảnh đuôi file (JPG hoặc PNG)");
      }
    } catch (error) {
      toast.error("Lỗi khi up ảnh: " + error.message);
    }
  };
  
  
  // const savePhoto = async (e) => {
  //   e.preventDefault();
  //   let imageURL;

  //   try {
  //     if(
  //       profileImage !== null && (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || profileImage.type === "image/png")
  //     ) {
  //         const image = new FormData();
  //         image.append("file", profileImage);
  //         image.append("cloud_name", cloud_name)
  //         image.append("upload_preset", upload_preset);

  //         // save ảnh ở cloud
  //         const response = await fetch(url, { 
  //           method: "POST", 
  //           body: image
  //         })
  //         const imgData = await response.json();
  //         console.log(imgData)
          
  //         imageURL = imgData.url.toString();
  //     }

  //     //save image to mongoDB
  //     const userData = {
  //       photo: profileImage ? imageURL : profile.photo
  //     }
  //     await dispatch(updatePhoto(userData));
  //     setaImagePreview(null);
  //   } catch (error) {
  //     toast.error(error.message)
  //   }
  // }

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
            <PageMenu />
            <h2>Profile</h2>
            <div className="--flex-start profile">
              <Card cardClass={"card"}>
                {!isLoading && (
                  <>
                    <div className="profile-photo">
                      <div>
                        <img
                          src={ imagePreview === null ? user?.photo : imagePreview } 
                          alt="profile"
                        />
                        <h4>Role: {profile.role}</h4>
                        {imagePreview !== null && (
                          <div className="--center-all">
                            <button className="--btn --btn-secondary" onClick={savePhoto}>
                            <RiUploadCloud2Fill size={18} />
                              Upload Photo
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <form onSubmit={saveProfile}>
                      {/* Input Photo */}
                      <p>
                        <label>Change Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleImageChange}
                        />
                      </p>

                      {/* Input Name */}
                      <p>
                        <label>Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={profile?.name}
                          onChange={handleInputChange}
                          required
                        />
                      </p>

                      {/* input email */}
                      <p>
                        <label>Email: </label>
                        <input
                          type="email"
                          name="email"
                          value={profile?.email}
                          onChange={handleInputChange}
                          disabled
                        />
                      </p>

                      {/* input phone */}
                      <p>
                        <label>Phone: </label>
                        <input
                          type="number"
                          name="phone"
                          value={profile?.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </p>

                      {/* input address */}
                      <p>
                        <label>Address: </label>
                        <input
                          type="text"
                          name="address"
                          value={profile?.address?.address}
                          onChange={handleInputChange}
                          required
                        />
                      </p>

                      {/* input state */}
                      <p>
                        <label>State: </label>
                        <input
                          type="text"
                          name="state"
                          value={profile?.address?.state}
                          onChange={handleInputChange}
                          required
                        />
                      </p>

                      {/* input Country */}
                      <p>
                        <label>Country: </label>
                        <input
                          type="text"
                          name="country"
                          value={profile?.address?.country}
                          onChange={handleInputChange}
                          required
                        />
                      </p>
                      <button className="--btn --btn-primary --btn-block">
                        Cập nhật hồ sơ
                      </button>
                    </form>
                  </>
                )}
              </Card>
            </div>
        </div>
      </section>  
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  const username = user?.name || "..."

  return (
    <span style={{color: "#ff7722"}}>Hi, { shortenText(username, 9) } | </span>
  )
}

export default Profile