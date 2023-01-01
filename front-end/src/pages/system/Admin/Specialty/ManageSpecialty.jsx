import SystemHeader from "../../../../components/SystemHeader";
import MdEditor from "react-markdown-editor-lite";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import MarkdownIt from "markdown-it";
import { toBase64 } from "../../../../utils/CommonUtils";
import { getSpecialtiesHome } from "../../../../services/specialtyService";
import { getSpecialtyById } from "../../../../services/specialtyService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  fetchDeleteSpecialty,
  fetchUpdateSpecialty,
} from "../../../../store/actions/specialtyAction";
import { customStyles } from "../../../../utils/CommonUtils";

export default function ManageSpecialty() {
  let navigate = useNavigate();
  const [isClearable, setIsClearable] = useState(true);
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  let [name, setName] = useState("");
  let [markdown, setMarkdown] = useState("");
  let [markdownHtml, setMarkdownHtml] = useState("");
  let [img, setImg] = useState(null);
  let [imgUrl, setImgUrl] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [specialtyOtions, setSpecialtyOtions] = useState([]);
  const { updateSpecialtySuccess, deleteSpecialtySuccess } = useSelector(
    (state) => state.specialty
  );
  let { user } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSpecialties().catch();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role.keyMap !== "R1") {
        navigate("/login");
      }
    }
    clearInputState();
    setSelectedSpecialty(null);
    fetchSpecialties().catch();
  }, [updateSpecialtySuccess, deleteSpecialtySuccess]);

  useEffect(() => {
    clearInputState();
    if (selectedSpecialty) {
      fetchSpecialtyChangeSelect();
    }
  }, [selectedSpecialty]);

  const fetchSpecialtyChangeSelect = async () => {
    try {
      let res = await getSpecialtyById(selectedSpecialty.value);
      let specialty = res.data.specialty;
      setName(specialty.name);
      setMarkdown(specialty.markdown);
      setMarkdownHtml(specialty.markdownHtml);
      setImgUrl(specialty.image);
      setImg(specialty.image);
    } catch (e) {
      console.log(e);
    }
  };

  function clearInputState() {
    setName("");
    setMarkdown("");
    setMarkdownHtml("");
    setImg(null);
    setImgUrl("");
  }

  const fetchSpecialties = async () => {
    let res = await getSpecialtiesHome();
    if (res && res.data.errCode === 0) {
      let specialties = res.data.specialties;
      let options = [];
      specialties.map((item) => {
        let specialty = {};
        specialty.value = item._id;
        specialty.label = item.name;
        options.push(specialty);
      });
      setSpecialtyOtions(options);
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

  function validateInput() {
    if (!name || !markdown || !img || !selectedSpecialty) {
      toast.warning("Missing iput");
      return false;
    } else return true;
  }

  function handleUpdateClinic() {
    if (!selectedSpecialty) {
      toast.warning("Please select a speacialty!");
    } else {
      if (validateInput) {
        dispatch(
          fetchUpdateSpecialty({
            specialty: {
              id: selectedSpecialty.value,
              name: name,
              markdown: markdown,
              markdownHtml: markdownHtml,
              image: img,
            },
          })
        );
      }
    }
  }

  function handleDeleteClinic() {
    if (!selectedSpecialty) {
      toast.warning("Please select a speacialty!");
    } else {
      if (validateInput()) {
        var result = confirm(`Are you sure to delete "${name}" specialty ?`);
        if (result) {
          dispatch(fetchDeleteSpecialty({ id: selectedSpecialty.value }));
        }
      }
    }
  }

  return (
    <>
      <SystemHeader />
      <div className="container mx-auto px-2">
        <div className="text-center uppercase text-3xl font-medium pt-4 mb-10">
          Manage Specialties
        </div>
        <div className="container mx-auto px-2">
          <Select
            isClearable={isClearable}
            styles={customStyles}
            value={selectedSpecialty ? selectedSpecialty : null}
            onChange={setSelectedSpecialty}
            options={specialtyOtions}
          />
          <div>
            <div className=" md:container md:mx-auto flex flex-col ">
              {/* <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4"> */}
              {/* Name Input */}
              <div className="w-ful ">
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
                {/* </div> */}
                {/* Name Input */}
              </div>
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
              {/* Image Input */}

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

              <div className="pt-8 pb-8 justify-center flex justify-between">
                <button
                  className="btn btn-success w-40 text-white"
                  onClick={() => handleUpdateClinic()}
                >
                  Save
                </button>
                <button
                  className="btn btn-error w-40 text-white"
                  onClick={() => handleDeleteClinic()}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
