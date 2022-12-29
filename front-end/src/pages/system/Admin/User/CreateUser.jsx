import { useState, useEffect } from "react";
import userImg from "../../../../assets/images/user.jpg";
import { toast } from "react-toastify";
import ModalCreateUser from "./ModalCreateUser";
import { toBase64 } from "../../../../utils/CommonUtils";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateUserOptions } from "../../../../store/actions/allcodeAction";
import { fetchCreateUser } from "../../../../store/actions/userAction";

export default function CreateUser(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let [img, setImg] = useState(null);
  let [imgUrl, setImgUrl] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderOptions, setGenderOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [positionOptions, setpositionOptions] = useState([]);

  const dispatch = useDispatch();
  const { roles, genders, positions } = useSelector((state) => state.allcode);
  const { createUserSuccess } = useSelector((state) => state.user);

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImg(base64);
    setImgUrl(URL.createObjectURL(file));
  }

  useEffect(() => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setPhoneNumber("");
    setAddress("");
    setImg("");
    setImgUrl("");
    setSelectedGender(null);
    setSelectedPosition(null);
    setSelectedRole(null);
    document.getElementById("imgCreateUser").value = "";
  }, [createUserSuccess]);

  useEffect(() => {
    dispatch(fetchCreateUserOptions());
  }, []);

  useEffect(() => {
    setGenderOptions(genders);
    setRoleOptions(roles);
    setpositionOptions(positions);
  }, [roles]);

  function handleCreateUser() {
    if (validateInputCreateUser()) {
      dispatch(
        fetchCreateUser({
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          address,
          role: selectedRole.value,
          position: selectedPosition ? selectedPosition.value : "",
          gender: selectedGender.value,
          image: img,
        })
      );
    }
  }

  function validateInputCreateUser() {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !selectedGender.value ||
      !selectedRole.value ||
      !img
    ) {
      toast.warning("Missing input");
      return false;
    } else return true;
  }
  return (
    <>
      <div
        htmlFor="create-user-modal"
        className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
        onClick={() => {
          document.getElementById("create-user-modal").checked = true;
          props.setOpenModal(true);
        }}
      >
        <>
          <figure className="px-10 pt-10">
            <img src={userImg} alt="Shoes" className="rounded-box" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Users</h2>
            <p>Create a new user</p>
          </div>
        </>
      </div>
      {/* <------------------------ Modal here -------------------> */}
      <input type="checkbox" id="create-user-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create A New User.</h3>
          <label
            htmlFor="create-user-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => props.setOpenModal(false)}
          >
            ✕
          </label>
          <div className="divider"></div>
          {/* <--------------------- Modal content here --------------------> */}

          <ModalCreateUser
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            address={address}
            setAddress={setAddress}
            setFirstName={setFirstName}
            firstName={firstName}
            lastName={lastName}
            setLastName={setLastName}
            imgUrl={imgUrl}
            img={img}
            handleImgChange={handleImgChange}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedPosition={selectedPosition}
            selectedRole={selectedRole}
            setSelectedPosition={setSelectedPosition}
            setSelectedRole={setSelectedRole}
            genderOptions={genderOptions}
            positionOptions={positionOptions}
            roleOptions={roleOptions}
          />

          {/* <--------------------- Modal content here --------------------> */}
          <div className="modal-action">
            <label
              htmlFor="create-user-modal"
              className="btn"
              onClick={() => props.setOpenModal(false)}
            >
              Cancel
            </label>
            <button className="btn btn-primary ml-4" onClick={handleCreateUser}>
              Create
            </button>
          </div>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
    </>
  );
}
