import SystemHeader from "../../../../components/SystemHeader";
import MdEditor from "react-markdown-editor-lite";
import { useState, useEffect } from "react";
import { getClinicsHome } from "../../../../services/clinicService";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
import { toBase64 } from "../../../../utils/CommonUtils";
import { fetchProvinceOptions } from "../../../../store/actions/allcodeAction";
import { getClinicById } from "../../../../services/clinicService";
import { toast } from "react-toastify";
import {
  fetchDeleteClinic,
  fetchUpdateClinic,
} from "../../../../store/actions/clinicAction";

export default function ManageClinic() {
  const [isClearable, setIsClearable] = useState(true);
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  let [name, setName] = useState("");
  let [address, setAddress] = useState("");
  let [markdown, setMarkdown] = useState("");
  let [markdownHtml, setMarkdownHtml] = useState("");
  let [img, setImg] = useState(null);
  let [imgUrl, setImgUrl] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [clinicOptions, setClinicOptions] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const { provinces } = useSelector((state) => state.allcode);
  const { updateClinicSuccess, deleteClinicSuccess } = useSelector(
    (state) => state.clinic
  );

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 46,
      minHeight: 35,
    }),
  };

  useEffect(() => {
    dispatch(fetchProvinceOptions());
    fetchClinics().catch();
  }, []);

  useEffect(() => {
    clearInputState();
    setSelectedClinic(null);
    setSelectedProvince(null);
    fetchClinics().catch();
  }, [updateClinicSuccess, deleteClinicSuccess]);

  useEffect(() => {
    clearInputState();
    if (selectedClinic) {
      fetchClinicChangeSelect();
    }
  }, [selectedClinic]);

  function clearInputState() {
    setName("");
    setAddress("");
    setSelectedProvince(null);
    setMarkdown("");
    setMarkdownHtml("");
    setImg(null);
    setImgUrl("");
  }

  async function fetchClinicChangeSelect() {
    try {
      let res = await getClinicById(selectedClinic.value);
      let clinic = res.data.clinic;
      setName(clinic.name);
      setAddress(clinic.address);
      setMarkdown(clinic.markdown);
      setMarkdownHtml(clinic.markdownHtml);
      setImgUrl(clinic.image);
      setImg(clinic.image);
      if (clinic.province) {
        setSelectedProvince({
          value: clinic.province._id,
          label: clinic.province.value,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setProvinceOptions(provinces);
  }, [provinces]);

  const fetchClinics = async () => {
    let res = await getClinicsHome();
    if (res && res.data.errCode === 0) {
      let clinics = res.data.clinics;
      let options = [];
      clinics.map((item) => {
        let clinic = {};
        clinic.value = item._id;
        clinic.label = item.name;
        options.push(clinic);
      });
      setClinicOptions(options);
    }
  };

  function handleEditorChange({ html, text }) {
    setMarkdown(text);
    setMarkdownHtml(html);
  }

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImg(base64);
    setImgUrl(URL.createObjectURL(file));
  }

  function handleSaveClinic() {
    if (!selectedClinic) {
      toast.warning("Please select a clinic");
    }
    if (validateInput()) {
      dispatch(
        fetchUpdateClinic({
          clinic: {
            id: selectedClinic.value,
            name: name,
            address: address,
            markdown: markdown,
            province: selectedProvince.value,
            markdownHtml: markdownHtml,
            image: img,
          },
        })
      );
    }
  }

  function handleDeleteClinic() {
    if (!selectedClinic) {
      toast.warning("Please select a clinic");
    } else {
      if (validateInput()) {
        var result = confirm(`Are you sure to delete "${name}" specialty ?`);
        if (result) {
          console.log(selectedClinic.value);
          dispatch(fetchDeleteClinic(selectedClinic.value));
        }
      }
    }
  }

  function validateInput() {
    if (
      !name ||
      !markdown ||
      !img ||
      !address ||
      !selectedProvince ||
      !selectedClinic
    ) {
      toast.warning("Missing iput");
      return false;
    } else return true;
  }

  return (
    <>
      <SystemHeader />
      <div className="container mx-auto px-2">
        <div className="text-center uppercase text-3xl font-medium pt-4 mb-10">
          Manage Clinics
        </div>
        <div className="container mx-auto px-2">
          <Select
            isClearable={isClearable}
            styles={customStyles}
            value={selectedClinic ? selectedClinic : null}
            onChange={setSelectedClinic}
            options={clinicOptions}
          />
          <div>
            <div className=" md:container md:mx-auto flex flex-col ">
              <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4">
                {/* Name Input */}
                <div className="w-ful md:w-1/2">
                  <div className="form-control w-ful">
                    <label className="label" htmlFor="name-clinic">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      id="name-clinic"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input input-bordered w-full "
                    />
                  </div>
                </div>
                {/* Name Input */}
                {/* Province Input */}
                <div className="w-ful md:w-1/2">
                  <div className="form-control w-ful">
                    <label className="label" htmlFor="province">
                      <span className="label-text">Province</span>
                    </label>
                    <div className="form-control">
                      <Select
                        isClearable={isClearable}
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
              {/* Address Input */}
              <div>
                <div className="form-control w-full ">
                  <label className="label" htmlFor="address-clinic">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="text"
                    id="address-clinic"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input input-bordered w-full "
                  />
                </div>
              </div>
              {/* Address Input */}
              {/* Description Input */}
              <label htmlFor="">Description</label>
              <div className="pt-4">
                <MdEditor
                  style={{ height: "700px" }}
                  value={markdown}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
              </div>
              {/* Description Input */}
              {/* Image Input */}
              <div className="pt-4 flex justify-center items-center gap-x-4 flex-col md:flex-row">
                <div className="carousel-item h-58 w-72 border-slate-300">
                  <img src={imgUrl} className="rounded-box" />
                </div>
                <label htmlFor="img" className="hover:cursor-pointer">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  id="imgClinic"
                  className="file-input file-input-bordered file-input-info w-full max-w-xs hover:cursor-pointer"
                  onChange={(e) => handleImgChange(e.target.files[0])}
                />
              </div>
              <div className="pt-8 pb-8 justify-center flex ">
                <button
                  className="btn btn-success w-40 text-white"
                  onClick={() => handleSaveClinic()}
                >
                  Save
                </button>
                <button
                  className="btn btn-error w-40 text-white pl-4"
                  onClick={() => handleDeleteClinic()}
                >
                  Delete
                </button>
              </div>
              {/* Image Input */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
