import { useEffect, useState } from "react";
import Select from "react-select";

export default function ModalCreateUser(props) {
  let [showPass, setShowPass] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 46,
      minHeight: 35,
    }),
  };

  return (
    <>
      {" "}
      <div className=" md:container md:mx-auto flex flex-col ">
        {/* ------------------------------------ */}

        <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
          {/* email Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* email Input */}
          {/* password Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type={!showPass ? "password" : "text"}
                id="password"
                placeholder="Password"
                value={props.password}
                onChange={(e) => props.setPassword(e.target.value)}
                className="input input-bordered w-full "
              />
              <i
                className={
                  !showPass
                    ? "fa-solid fa-eye text-lg absolute right-10 top-36 pt-2 hover:cursor-pointer"
                    : "fa-solid fa-eye-slash text-lg absolute right-10 top-36 pt-2 hover:cursor-pointer"
                }
                onClick={() => setShowPass(!showPass)}
              ></i>
            </div>
          </div>
          {/* password Input */}
        </div>

        {/* ---------------------------- */}

        <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
          {/* firstName Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="firstName">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={props.firstName}
                onChange={(e) => props.setFirstName(e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* firstName Input */}
          {/* lastName Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="lastName">
                <span className="label-text">LastName</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={props.lastName}
                onChange={(e) => props.setLastName(e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* lastName Input */}
        </div>
        {/* ----------------------------- */}

        <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
          {/* gender Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="gender">
                <span className="label-text">Gender</span>
              </label>
            </div>
            <Select
              isClearable={isClearable}
              styles={customStyles}
              value={props.selectedGender ? props.selectedGender : null}
              onChange={props.setSelectedGender}
              options={props.genderOptions}
            />
          </div>
          {/* gender Input */}
          {/* role Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="role">
                <span className="label-text">Role</span>
              </label>
            </div>
            <Select
              isClearable={isClearable}
              styles={customStyles}
              value={props.selectedRole ? props.selectedRole : null}
              onChange={props.setSelectedRole}
              options={props.roleOptions}
            />
          </div>
        </div>
        {/* ---------------------------- */}
        <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
          {/* address Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="address-create-user">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                id="address-create-user"
                placeholder="Address"
                value={props.address}
                onChange={(e) => props.setAddress(e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* address Input */}
          {/* phoneNumber Input */}
          <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="phoneNumber">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Phone Number"
                value={props.phoneNumber}
                onChange={(e) => props.setPhoneNumber(e.target.value)}
                className="input input-bordered w-full "
              />
            </div>
          </div>
          {/* phoneNumber Input */}
        </div>
        {/* ---------------------------- */}

        {/* role Input */}
        {/* --------------------------------- */}
        {/* position Input */}
        {/* <div className="w-ful md:w-1/2">
            <div className="form-control w-ful">
              <label className="label" htmlFor="role">
                <span className="label-text">Position</span>
              </label>
            </div>
            <Select
              isClearable={isClearable}
              styles={customStyles}
              value={props.selectedPosition ? props.selectedPosition : null}
              onChange={props.setSelectedPosition}
              options={props.positionOptions}
            />
          </div> */}
        {/* position Input */}

        {/* ---------------------------- */}

        {/* Image Input */}
        {/* <div className="pt-4 flex justify-center gap-x-4 flex-col">
          {props.img && (
            <div className="carousel-item h-58 w-72 border-slate-300">
              <img src={props.imgUrl} className="rounded-box" />
            </div>
          )}
          <label htmlFor="imgCreateUser" className="hover:cursor-pointer">
            Image
          </label>
          <input
            type="file"
          accept="image/x-png,image/gif,image/jpeg"
            id="imgCreateUser"
            className="file-input file-input-bordered file-input-info w-full max-w-xs hover:cursor-pointer"
            onChange={(e) => props.handleImgChange(e.target.files[0])}
          />
        </div> */}

        {/* Image Input */}
      </div>
    </>
  );
}
