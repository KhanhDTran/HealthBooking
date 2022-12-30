import { useState, useEffect } from "react";
import clinicImg from "../../../../assets/images/clinics/laokhoa.jpg";
import ClinicModalContent from "./ClinicModalContent";
import MarkdownIt from "markdown-it";
import { toBase64 } from "../../../../utils/CommonUtils";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchCreateClinic } from "../../../../store/actions/clinicAction";
import { fetchProvinceOptions } from "../../../../store/actions/allcodeAction";

export default function CreateClinic(props) {
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
  const { createClinicSuccess } = useSelector((state) => state.clinic);
  const { provinces } = useSelector((state) => state.allcode);

  useEffect(() => {
    setName("");
    setMarkdown("");
    setMarkdownHtml("");
    setAddress("");
    setImg("");
    setImgUrl("");
    setSelectedProvince(null);
    document.getElementById("imgClinic").value = "";
  }, [createClinicSuccess]);

  useEffect(() => {
    dispatch(fetchProvinceOptions());
  }, []);

  useEffect(() => {
    setProvinceOptions(provinces);
  }, [provinces]);

  function handleEditorChange({ html, text }) {
    setMarkdown(text);
    setMarkdownHtml(html);
  }

  async function handleImgChange(file) {
    let base64 = await toBase64(file);
    if (base64) setImg(base64);
    setImgUrl(URL.createObjectURL(file));
  }

  function validateInput() {
    if (!name || !markdown || !img || !address || !selectedProvince) {
      toast.warning("Missing iput");
      return false;
    } else return true;
  }

  function handleCreateClinic() {
    if (validateInput()) {
      dispatch(
        fetchCreateClinic({
          name,
          province: selectedProvince.value,
          address,
          markdown,
          markdownHtml,
          image: img,
        })
      );
    }
  }

  return (
    <>
      <div
        htmlFor="create-clinic-modal"
        className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
        onClick={() => {
          document.getElementById("create-clinic-modal").checked = true;
          props.setOpenModal(true);
        }}
      >
        <figure className="px-10 pt-10 h-4/6">
          <img src={clinicImg} alt="Shoes" className="rounded-box " />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Clinic</h2>
          <p>Create a new clinic</p>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
      <input
        type="checkbox"
        id="create-clinic-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Create a new clinic.</h3>
          <label
            htmlFor="create-clinic-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => props.setOpenModal(false)}
          >
            ✕
          </label>
          <div className="divider"></div>
          {/* <--------------------- Modal content here --------------------> */}
          <ClinicModalContent
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            markdown={markdown}
            mdParser={mdParser}
            handleEditorChange={handleEditorChange}
            img={img}
            imgUrl={imgUrl}
            handleImgChange={handleImgChange}
            selectedProvince={selectedProvince}
            setSelectedProvince={setSelectedProvince}
            provinceOptions={provinceOptions}
          />
          {/* <--------------------- Modal content here --------------------> */}
          <div className="modal-action">
            <label
              htmlFor="create-clinic-modal"
              className="btn"
              onClick={() => props.setOpenModal(false)}
            >
              Cancel
            </label>
            <button
              className="btn btn-primary ml-4"
              onClick={handleCreateClinic}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
    </>
  );
}
