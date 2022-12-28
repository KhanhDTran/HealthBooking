
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export default function ClinicModalContent(props) {
  return (
    <>
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
              value={props.name}
              onChange={(e) => props.setName(e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
        </div>
        {/* Name Input */}
        {/* Name Input */}
        <div>
          <div className="form-control w-full ">
            <label className="label" htmlFor="name">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={props.address}
              onChange={(e) => props.setAddress(e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
        </div>
        {/* Name Input */}
        {/* Description Input */}
        <div className="pt-4">
          <MdEditor
            style={{ height: "500px" }}
            value={props.markdown}
            renderHTML={(text) => props.mdParser.render(text)}
            onChange={props.handleEditorChange}
          />
        </div>
        {/* Description Input */}
        {/* Image Input */}
        <div className="pt-4 flex justify-center gap-x-4 flex-col">
          {props.img && (
            <div className="carousel-item h-58 w-72 border-slate-300">
              <img src={props.imgUrl} className="rounded-box" />
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
            onChange={(e) => props.handleImgChange(e.target.files[0])}
          />
        </div>

        {/* Image Input */}
      </div>
    </>
  );
}
