import SystemHeader from "../../../../components/SystemHeader";
import MdEditor from "react-markdown-editor-lite";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
import { toBase64 } from "../../../../utils/CommonUtils";
import { fetchManageDoctorsOptions } from "../../../../store/actions/allcodeAction";
import { getDoctorUsers } from "../../../../services/userService";
import { customStyles } from "../../../../utils/CommonUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchUpsertDoctorProfile } from "../../../../store/actions/doctorAction";
import { getDoctorProfileByUserId } from "../../../../services/doctorService";
import { fetchSpecialtyOptions } from "../../../../store/actions/specialtyAction";

export default function ManageDoctor() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* */);
  let [email, setEmail] = useState("");
  let [description, setDescription] = useState("");
  let [note, setNote] = useState("");

  let [markdown, setMarkdown] = useState("");
  let [markdownHtml, setMarkdownHtml] = useState("");
  let [img, setImg] = useState(null);
  let [imgUrl, setImgUrl] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorsOptions, setDoctorsOptions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [posistionOptions, setPosistionOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [priceOptions, setPriceOptions] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  const { provinces, positions, payment, price } = useSelector(
    (state) => state.allcode
  );
  const { upsertDoctorProfile } = useSelector((state) => state.doctor);
  const { specialtyOptionsRedux } = useSelector((state) => state.specialty);
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role.keyMap !== "R1") {
        navigate("/login");
      }
    }
    window.scrollTo(0, 0);
    dispatch(fetchManageDoctorsOptions());
    fetchDoctorUsers();
    dispatch(fetchSpecialtyOptions());
  }, []);

  useEffect(() => {
    setSpecialtyOptions(specialtyOptionsRedux);
  }, [specialtyOptionsRedux]);

  useEffect(() => {
    clearInputState();
  }, [upsertDoctorProfile]);

  useEffect(() => {
    setProvinceOptions(provinces);
    setPaymentOptions(payment);
    setPriceOptions(price);
    setPosistionOptions(positions);
  }, [provinces]);

  async function fetchDoctorUsers() {
    try {
      let res = await getDoctorUsers();
      let result = [];
      if (res && res.data.errCode === 0) {
        let doctorList = res.data.doctors;
        setDoctors(doctorList);
        doctorList.map((item) => {
          let doctor = {};
          doctor.value = item._id;
          doctor.label = item.firstName + " " + item.lastName;
          result.push(doctor);
        });
      }
      setDoctorsOptions(result);
    } catch (e) {
      console.log(e);
    }
  }

  function handleEditorChange({ html, text }) {
    setMarkdown(text);
    setMarkdownHtml(html);
  }

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImg(base64);
    setImgUrl(URL.createObjectURL(file));
  }

  function handleSaveDoctor() {
    if (!selectedDoctor) {
      toast.warning("Please select a doctor");
    } else {
      if (validateInput()) {
        dispatch(
          fetchUpsertDoctorProfile({
            user: selectedDoctor.value,
            position: selectedPosition.value,
            description: description,
            markdown: markdown,
            markdownHtml: markdownHtml,
            price: selectedPrice.value,
            province: selectedProvince.value,
            payment: selectedPayment.value,
            image: img,
            note: note,
            specialty: selectedSpecialty.value,
          })
        );
      }
    }
  }

  async function handleDoctorSelectChange(e) {
    clearInputState();
    setSelectedDoctor(e);
    if (e) {
      doctors.map((item) => {
        if (item._id === e.value) {
          setEmail(item.email);
        }
      });
      let res = await getDoctorProfileByUserId(e.value);
      if (res && res.data.errCode === 0) {
        let doctor = res.data.doctor;
        setDescription(doctor.description);
        setImg(doctor.image);
        setImgUrl(doctor.image);
        setMarkdown(doctor.markdown);
        setMarkdownHtml(doctor.markdownHtml);
        if (doctor.note) {
          setNote(doctor.note);
        }
        setSelectedPayment({
          value: doctor.payment._id,
          label: doctor.payment.value,
        });
        setSelectedPosition({
          value: doctor.position._id,
          label: doctor.position.value,
        });
        setSelectedPrice({
          value: doctor.price._id,
          label: doctor.price.value,
        });
        setSelectedProvince({
          value: doctor.province._id,
          label: doctor.province.value,
        });
        setSelectedSpecialty({
          value: doctor.specialty._id,
          label: doctor.specialty.name,
        });
      }
    }
  }

  function validateInput() {
    if (
      !markdown ||
      !img ||
      !selectedDoctor ||
      !selectedPayment ||
      !selectedPosition ||
      !selectedPrice ||
      !description ||
      !selectedSpecialty
    ) {
      toast.warning("Missing iput");
      return false;
    } else return true;
  }

  function clearInputState() {
    setEmail("");
    setDescription("");
    setNote("");
    setImg("");
    setImgUrl("");
    setMarkdown("");
    setMarkdownHtml("");
    setSelectedDoctor(null);
    setSelectedPayment(null);
    setSelectedPosition(null);
    setSelectedPrice(null);
    setSelectedProvince(null);
    setSelectedSpecialty(null);
    document.getElementById("img-doctor-profile").value = "";
  }

  return (
    <>
      <SystemHeader />
      <div className="container mx-auto px-2">
        <div className="text-center uppercase text-3xl font-medium pt-4 mb-10">
          Manage Doctors Profile
        </div>
        <div className="container mx-auto px-2">
          <label htmlFor="">Select Doctor</label>
          <Select
            isClearable={true}
            styles={customStyles}
            value={selectedDoctor ? selectedDoctor : null}
            onChange={(e) => {
              handleDoctorSelectChange(e);
            }}
            options={doctorsOptions}
          />
          <div className=" md:container md:mx-auto flex flex-col ">
            <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
              {/* Email Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label" htmlFor="email-doctor">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    disabled={true}
                    id="email-doctor"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full "
                  />
                </div>
              </div>
              {/* Email Input */}
              {/* Province Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label" htmlFor="province">
                    <span className="label-text">Province</span>
                  </label>
                  <div className="form-control">
                    <Select
                      isClearable={true}
                      styles={customStyles}
                      value={selectedProvince ? selectedProvince : null}
                      onChange={setSelectedProvince}
                      options={provinceOptions}
                    />
                  </div>
                </div>
              </div>
              {/* Province Input */}
            </div>

            {/* ---------------------------------------- */}

            <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
              {/* Position Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label">
                    <span className="label-text">Position</span>
                  </label>
                  <div className="form-control">
                    <Select
                      isClearable={true}
                      styles={customStyles}
                      value={selectedPosition ? selectedPosition : null}
                      onChange={setSelectedPosition}
                      options={posistionOptions}
                    />
                  </div>
                </div>
              </div>
              {/* Position Input */}
              {/* Specialty Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label">
                    <span className="label-text">Specialty</span>
                  </label>
                  <div className="form-control">
                    <Select
                      isClearable={true}
                      styles={customStyles}
                      value={selectedSpecialty ? selectedSpecialty : null}
                      onChange={setSelectedSpecialty}
                      options={specialtyOptions}
                    />
                  </div>
                </div>
              </div>
              {/* Specialty Input */}
            </div>

            {/* -----------------------------------------*/}

            <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
              {/* Payment Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label">
                    <span className="label-text">Payment</span>
                  </label>
                  <div className="form-control">
                    <Select
                      isClearable={true}
                      styles={customStyles}
                      value={selectedPayment ? selectedPayment : null}
                      onChange={setSelectedPayment}
                      options={paymentOptions}
                    />
                  </div>
                </div>
              </div>
              {/* Payment Input */}
              {/* Price Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <div className="form-control">
                    <Select
                      isClearable={true}
                      styles={customStyles}
                      value={selectedPrice ? selectedPrice : null}
                      onChange={setSelectedPrice}
                      options={priceOptions}
                    />
                  </div>
                </div>
              </div>
              {/* Price Input */}
            </div>
            {/* -------------------------- */}
            <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
              {/* Note Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label" htmlFor="note-doctor">
                    <span className="label-text">Note</span>
                  </label>
                  <div className="form-control">
                    <input
                      type="text"
                      id="note-doctor"
                      placeholder="Note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="input input-bordered w-full "
                    />
                  </div>
                </div>
              </div>
              {/* Note Input */}
              {/* description Input */}
              <div className="w-ful md:w-1/2">
                <div className="form-control w-ful">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <div className="form-control">
                    <textarea
                      className="textarea textarea-bordered"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              {/* description Input */}
            </div>

            {/* Image Input */}
            <div className="pt-4 flex justify-center items-center gap-x-4 flex-col md:flex-row">
              {/* img  */}
              <div className="w-ful md:w-1/2 pt-2">
                <div className="carousel-item h-58 w-72 border-slate-300">
                  <img src={imgUrl} className="rounded-box" />
                </div>
              </div>
              {/* img  */}
              <label
                htmlFor="img-doctor-profile"
                className="hover:cursor-pointer"
              >
                Image
              </label>
              <input
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                id="img-doctor-profile"
                className="file-input file-input-bordered file-input-info w-full max-w-xs hover:cursor-pointer"
                onChange={(e) => handleImgChange(e.target.files[0])}
              />
            </div>
            {/* Detail Input */}
            <label htmlFor="">Detail Infor</label>
            <div className="pt-4">
              <MdEditor
                style={{ height: "600px" }}
                value={markdown}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </div>
            {/* Detail Input */}

            <div className="pt-8 pb-8 justify-center flex ">
              <button
                className="btn btn-success w-40 text-white"
                onClick={() => handleSaveDoctor()}
              >
                Save
              </button>
            </div>
            {/* Image Input */}
          </div>
        </div>
      </div>
    </>
  );
}
