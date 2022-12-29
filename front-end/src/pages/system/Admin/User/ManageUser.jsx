import SystemHeader from "../../../../components/SystemHeader";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../services/userService";
import Select from "react-select";
import { fetchCreateUserOptions } from "../../../../store/actions/allcodeAction";
import { useDispatch, useSelector } from "react-redux";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const [isClearable, setIsClearable] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderOptions, setGenderOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  let [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const { roles, genders } = useSelector((state) => state.allcode);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 46,
      minHeight: 35,
    }),
  };

  useEffect(() => {
    if (openModal) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }, [openModal]);

  useEffect(() => {
    fetchUsers();
    dispatch(fetchCreateUserOptions());
  }, []);

  useEffect(() => {
    setGenderOptions(genders);
    setRoleOptions(roles);
  }, [roles]);

  async function fetchUsers() {
    try {
      let res = await getAllUsers();
      if (res && res.data.errCode === 0) {
        setUsers(res.data.users);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleSelectUser(user) {
    {
      if (user !== selectUser) {
        setSelectUser(user);
        setPassword("khongcomaxemdau");
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setAddress(user.address);
        setPhoneNumber(user.phoneNumber);
        setSelectedGender({ value: user.gender._id, label: user.gender.value });
        setSelectedRole({ value: user.role._id, label: user.role.value });
      } else {
        setSelectUser(null);
        setSelectUser("");
        setPassword("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setPhoneNumber("");
        setSelectedGender(null);
        setSelectedRole(null);
      }
    }
  }

  function validateInputCreateUser() {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !selectedGender.value ||
      !selectedRole.value
    ) {
      toast.warning("Missing input");
      return false;
    } else return true;
  }

  return (
    <>
      <SystemHeader />
      <div className="container mx-auto  " data-theme="">
        <div className="text-center uppercase text-3xl font-medium pt-4 mb-10">
          Manage Users
        </div>
        <div className="container px-4">
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
                    disabled={true}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    disabled={true}
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full "
                  />
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                  value={selectedGender ? selectedGender : null}
                  onChange={setSelectedGender}
                  options={genderOptions}
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
                  value={selectedRole ? selectedRole : null}
                  onChange={setSelectedRole}
                  options={roleOptions}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input input-bordered w-full "
                  />
                </div>
              </div>
              {/* phoneNumber Input */}
            </div>
            {/* ---------------------------- */}
          </div>
        </div>
        <div className="flex flex-row pt-8 pb-4 justify-between">
          <button
            className="btn btn-info text-white ml-4"
            disabled={selectUser ? false : true}
          >
            Save
          </button>
          {selectUser ? (
            <>
              {" "}
              <a href="#confirm-delete-modal">
                <button
                  href="#confirm-delete-modal"
                  className="btn btn-error text-white mr-4"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Delete
                </button>
              </a>
            </>
          ) : (
            <>
              {" "}
              <button
                disabled={true}
                href="#confirm-delete-modal"
                className="btn btn-error text-white mr-4"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>

        {/* The button to open modal */}

        {/* <p>{/<em> Put this part before </body> tag </em>/}</p> */}
        <div className="modal" id="confirm-delete-modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete User</h3>
            <p className="py-4">Are you sure to delete this user:</p>
            {selectUser && (
              <>
                {" "}
                <span>
                  Name:{" "}
                  {selectUser && selectUser
                    ? selectUser.firstName + selectUser.lastName
                    : ""}
                </span>
                <br />
                <span>
                  Role: {selectUser && selectUser ? selectUser.role.value : ""}{" "}
                </span>
              </>
            )}
            <div className="modal-action">
              <a
                href="#"
                className="btn"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                Cancel
              </a>
              <a href="#">
                <button
                  href="#"
                  className="btn btn-error text-white mr-4"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  Delete
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="divider"></div>
        <div className="grid  card  rounded-box place-items-center ">
          <div className="p-4  overflow-x-auto w-full ">
            <table className="table w-full ">
              {/* <!-- head --> */}
              <thead>
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Gender</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- row 1 --> */}
                {users.map((item, index) => {
                  return (
                    <tr
                      className={
                        selectUser === item
                          ? "hover hover:cursor-pointer active"
                          : "hover hover:cursor-pointer"
                      }
                      key={index}
                      onClick={() => handleSelectUser(item)}
                    >
                      <th>{index + 1}</th>
                      <td> {item.email} </td>
                      <td> {item.firstName} </td>
                      <td> {item.lastName} </td>
                      <td> {item.role.value} </td>
                      <td> {item.gender.value} </td>
                      <td> {item.phoneNumber} </td>
                      <td> {item.address} </td>
                    </tr>
                  );
                })}
                {/* <tr className=" hover:cursor-pointer">
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
