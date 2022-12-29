import { useEffect, useState } from "react";
import doctorImg from "../../../../assets/images/specialties/cotsong.png";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import { fetchCreateSpecialty } from "../../../../store/actions/specialtyAction";
import { useDispatch, useSelector } from "react-redux";
import { toBase64 } from "../../../../utils/CommonUtils";
export default function CreateSpecialty(props) {
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  let [name, setName] = useState("");
  let [markdown, setMarkdown] = useState("");
  let [markdownHtml, setMarkdownHtml] = useState("");
  let [img, setImg] = useState(null);
  let [imgUrl, setImgUrl] = useState("");
  const { createSpecialtySuccess } = useSelector((state) => state.specialty);

  useEffect(() => {
    setName("");
    setMarkdown("");
    setMarkdownHtml("");
    setImg("");
    setImgUrl("");
    document.getElementById("img").value = "";
  }, [createSpecialtySuccess]);

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
    if (!name || !markdown || !img) {
      toast.warning("Missing iput");
      return false;
    } else return true;
  }

  function handleCreate() {
    if (validateInput()) {
      dispatch(fetchCreateSpecialty({ name, markdown, markdownHtml, img }));
    }
  }

  return (
    <>
      <div
        htmlFor="create-specialty-modal"
        className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
        onClick={() => {
          document.getElementById("create-specialty-modal").checked = true;
          props.setOpenModal(true);
        }}
      >
        <figure className="px-10 pt-10">
          <img src={doctorImg} alt="Shoes" className="rounded-box" />
        </figure>
        <div className="card-body items-center text-center ">
          <h2 className="card-title">Specialties</h2>
          <p>Create a new specialty</p>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
      <input
        type="checkbox"
        id="create-specialty-modal"
        className="modal-toggle"
      />
      <div className="modal ">
        <div className="modal-box w-11/12 max-w-5xl h-5/6 ">
          <div className="header-modal ">
            <h3 className="font-bold text-lg ">Create A New Specialty.</h3>
            <label
              htmlFor="create-specialty-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2 "
              onClick={() => props.setOpenModal(false)}
            >
              ✕
            </label>
            <div className="divider"></div>
          </div>
          {/* <--------------------- Modal content here --------------------> */}
          <div className=" md:container md:mx-auto flex flex-col ">
            {/* Name Input */}
            <div>
              <div className="form-control w-full ">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full "
                />
              </div>
            </div>
            {/* Name Input */}
            {/* Description Input */}
            <div className="pt-4">
              <MdEditor
                style={{ height: "500px" }}
                value={markdown}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
            </div>
            {/* Description Input */}
            {/* Image Input */}
            <div className="pt-4 flex justify-center gap-x-4 flex-col">
              {img && (
                <div className="carousel-item h-58 w-72 border-slate-300">
                  <img src={imgUrl} className="rounded-box" />
                </div>
              )}
              <label htmlFor="img " className="hover:cursor-pointer">
                Image
              </label>
              <input
                type="file"
                accept=".png,.jpg"
                id="img"
                className="file-input file-input-bordered file-input-info w-full max-w-xs hover:cursor-pointer"
                onChange={(e) => handleImgChange(e.target.files[0])}
              />
            </div>

            {/* Image Input */}
          </div>
          {/* <--------------------- Modal content here --------------------> */}
          <div className="modal-action">
            <label
              htmlFor="create-specialty-modal"
              className="btn"
              onClick={() => props.setOpenModal(false)}
            >
              Cancel
            </label>

            <button className="btn btn-primary ml-4" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
      {/* <------------------------ Modal here -------------------> */}
    </>
  );
}
