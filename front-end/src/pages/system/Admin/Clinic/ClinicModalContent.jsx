import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { useState } from "react";

export default function ClinicModalContent(props) {
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
                value={props.name}
                onChange={(e) => props.setName(e.target.value)}
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
                  value={props.selectedProvince ? props.selectedProvince : null}
                  onChange={props.setSelectedProvince}
                  options={props.provinceOptions}
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
              value={props.address}
              onChange={(e) => props.setAddress(e.target.value)}
              className="input input-bordered w-full "
            />
          </div>
        </div>
        {/* Address Input */}
        {/* Description Input */}
        <label htmlFor="">Description</label>
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
          <label htmlFor="img" className="hover:cursor-pointer">
            Image
          </label>
          <input
            type="file"
            accept=".png,.jpg"
            id="imgClinic"
            className="file-input file-input-bordered file-input-info w-full max-w-xs hover:cursor-pointer"
            onChange={(e) => props.handleImgChange(e.target.files[0])}
          />
        </div>

        {/* Image Input */}
      </div>
    </>
  );
}
