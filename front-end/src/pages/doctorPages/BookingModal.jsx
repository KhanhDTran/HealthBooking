import _ from "lodash";
import moment from "moment";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { customStyles } from "../../utils/CommonUtils";
import { fetchBookingOptions } from "../../store/actions/allcodeAction";
import {
  fetchCreateBooking,
  fetchConfirmBooking,
} from "../../store/actions/bookingAction";
import OtpInput from "react-otp-input";
import "./BookingModal.scss";

export default function BookingModal(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [age, setAge] = useState(0);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderOptions, setGenderOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);

  const [sec, setSec] = useState(0);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const { genders, provinces, roles, status } = useSelector(
    (state) => state.allcode
  );
  const { createBookingSuccess, confirmBookingSuccess, patient } = useSelector(
    (state) => state.booking
  );

  function clearInputState() {
    setEmail("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setReason("");
    setPhoneNumber("");
    setAge("");
    setSelectedGender(null);
    setSelectedProvince(null);
    setOtp();
    setSec(0);
  }

  useEffect(() => {
    dispatch(fetchBookingOptions());
  }, []);

  useEffect(() => {
    if (!sec) return;
    const intervalId = setInterval(() => {
      setSec(sec - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [sec]);

  useEffect(() => {
    if (confirmBookingSuccess) {
      clearInputState();
      setVerifyOtp(false);
      props.setOpenModal(false);
    }
  }, [confirmBookingSuccess]);

  useEffect(() => {
    if (createBookingSuccess) {
      setVerifyOtp(true);
      setSec(60);
    }
  }, [createBookingSuccess]);

  useEffect(() => {
    if (!_.isEmpty(genders)) {
      setGenderOptions(genders);
    }
    if (!_.isEmpty(provinces)) {
      setProvinceOptions(provinces);
    }
  }, [genders]);

  console.log(otp);

  function handleSaveBooking() {
    if (validateInput()) {
      dispatch(
        fetchCreateBooking({
          email,
          firstName,
          lastName,
          gender: selectedGender.value,
          address,
          phoneNumber,
          role: _.find(roles, { keyMap: "R3" })._id,
          province: selectedProvince.value,
          doctor: props.doctor._id,
          note,
          age,
          status: _.find(status, { keyMap: "S1" })._id,
          date: props.time.date,
          time: props.time.time._id,
          doctor: props.doctor._id,
        })
      );
    }
  }

  function validateInput() {
    if (
      !firstName ||
      !lastName ||
      !reason ||
      !email ||
      !phoneNumber ||
      !address ||
      !selectedGender ||
      !selectedProvince ||
      !age
    ) {
      toast.warning("Missing input");
      return false;
    } else return true;
  }

  function handleResendOtp() {
    setSec(10);
  }

  function handleSendVerify() {
    if (+otp < 100000) {
      toast.warning("Please enter verification code");
    } else {
      dispatch(
        fetchConfirmBooking({
          email,
          status: _.find(status, { keyMap: "S2" })._id,
          date: props.time.date,
          time: props.time.time._id,
          doctor: props.doctor._id,
          patient,
          token: otp,
        })
      );
    }
  }

  return (
    <>
      {!_.isEmpty(props.doctor) && !_.isEmpty(props.time) && (
        <>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <label
                onClick={() => props.setOpenModal(false)}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="font-bold text-lg">Booking</h3>
              <div className="divider"></div>
              {/* ------------------------------------------------------------- */}

              {!verifyOtp ? (
                <>
                  <div className="flex flex-col w-full border-opacity-50 gap-4">
                    <div className="flex flex-row gap-4">
                      <div>
                        <img
                          src={props.doctor.image}
                          className="w-24 h-24 rounded-full"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-2xl font-semibold">
                          {props.doctor.position.value}{" "}
                          {props.doctor.user.firstName}{" "}
                          {props.doctor.user.lastName}
                        </span>
                        <span>
                          <i className="fa-regular fa-clock pr-2"></i>Thời gian
                          : {props.time.time.value} ,
                          {moment(props.time.date).format("DD/MM/YYYY")}
                        </span>
                        <span className="">
                          {" "}
                          <i className="fa-solid fa-dollar-sign pr-4"></i>Giá
                          khám:{" "}
                          <NumericFormat
                            type="text"
                            displayType="text"
                            value={props.doctor.price.value}
                            thousandSeparator={true}
                            suffix="VNĐ"
                          />
                        </span>

                        <span> </span>
                      </div>
                    </div>
                  </div>

                  {/* ------------ */}

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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full "
                          />
                        </div>
                      </div>
                      {/* email Input */}
                      {/* gender Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label className="label" htmlFor="gender">
                            <span className="label-text">Gender</span>
                          </label>
                        </div>
                        <Select
                          isClearable={true}
                          styles={customStyles}
                          value={selectedGender ? selectedGender : null}
                          onChange={setSelectedGender}
                          options={genderOptions}
                        />
                      </div>
                      {/* gender Input */}
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

                    {/* ---------------------------- */}
                    <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
                      {/* address Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label
                            className="label"
                            htmlFor="address-create-user"
                          >
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
                      {/* Province Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label className="label" htmlFor="Province">
                            <span className="label-text">Province</span>
                          </label>
                        </div>
                        <Select
                          isClearable={true}
                          styles={customStyles}
                          value={selectedProvince ? selectedProvince : null}
                          onChange={setSelectedProvince}
                          options={provinceOptions}
                        />
                      </div>
                      {/* Province Input */}
                    </div>
                    {/* ---------------------------- */}

                    <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
                      {/* reason Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label className="label" htmlFor="reason-booking">
                            <span className="label-text">Reason</span>
                          </label>
                          <textarea
                            className="textarea  textarea-bordered"
                            placeholder="Reason"
                            id="reason-booking"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      {/* reason Input */}
                      {/* phoneNumber Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label className="label" htmlFor="phoneNumber">
                            <span className="label-text">Phone Number</span>
                          </label>
                          <input
                            type="number"
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
                    {/* ---------------------------------- */}
                    <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
                      {/* Note Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label className="label" htmlFor="Note-booking">
                            <span className="label-text">Note</span>
                          </label>
                          <textarea
                            className="textarea  textarea-bordered"
                            placeholder="Note for doctor"
                            id="Note-booking"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      {/* Note Input */}
                      {/* Age Input */}
                      <div className="w-ful md:w-1/2">
                        <div className="form-control w-ful">
                          <label className="label" htmlFor="Age">
                            <span className="label-text">Age</span>
                          </label>
                          <input
                            type="number"
                            min={1}
                            max={120}
                            id="Age"
                            placeholder="Phone Number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="input input-bordered w-full "
                          />
                        </div>
                      </div>
                      {/* Age Input */}
                    </div>
                  </div>

                  {/* ------------------------------------------------------------- */}
                  <div className="modal-action">
                    <div className="flex flex-row gap-4">
                      {" "}
                      <button
                        className="btn btn-active btn-ghost"
                        onClick={() => props.setOpenModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => handleSaveBooking()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 w-full ">
                  <div className="flex text-center align-center justify-center">
                    <span className="text-2xl text-bold">Verification </span>
                  </div>
                  <div className="flex justify-center">
                    <span>We've send a verification code to: {email} </span>{" "}
                  </div>
                  <div className="flex  align-center justify-center  w-full">
                    <OtpInput
                      className="  otp-input"
                      placeholder={123123}
                      value={otp}
                      inputStyle={true}
                      onChange={(e) => setOtp(e)}
                      numInputs={6}
                      separator={<span>-</span>}
                    />
                  </div>

                  <div className="flex  justify-center  w-full">
                    <span className="countdown font-mono text-4xl">
                      <span style={{ "--value": sec }}></span>
                    </span>
                    <span>s</span>
                  </div>

                  {sec === 0 && (
                    <div className="flex justify-center">
                      <a
                        className="link link-neutral"
                        onClick={() => handleResendOtp()}
                      >
                        Resend verification code
                      </a>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <button
                      className="btn btn-success text-white"
                      onClick={() => handleSendVerify()}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
