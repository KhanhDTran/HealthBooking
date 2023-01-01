import SystemHeader from "../../../../components/SystemHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchAllDoctors } from "../../../../store/actions/doctorAction";
import Select from "react-select";
import { customStyles } from "../../../../utils/CommonUtils";
import { fetchTimeSchedule } from "../../../../store/actions/allcodeAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllcode } from "../../../../services/allcodeService";

export default function ManageDoctorSchedule() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [doctorsOptions, setDoctorOptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [timeList, setTimeList] = useState([]);
  const [clickTime, setClickTime] = useState(false);

  let { user } = useSelector((state) => state.user);
  // let { times } = useSelector((state) => state.allcode);
  let { doctors, doctorOptionsRedux } = useSelector((state) => state.doctor);

  let [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (user.role.keyMap !== "R1") {
        navigate("/login");
      }
    }
    window.scrollTo(0, 0);
    dispatch(fetchAllDoctors());
    dispatch(fetchTimeSchedule());
  }, []);

  useEffect(() => {
    setDoctorOptions(doctorOptionsRedux);
  }, [doctorOptionsRedux]);

  useEffect(() => {
    timeList.map((item) => {
      item.selected = false;
    });
  }, [timeList]);

  useEffect(() => {
    fetchTimesAllcode();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      doctors.map((item) => {
        if (item._id == selectedDoctor.value) {
          console.log(item);
          setImgUrl(item.image);
        }
      });
    } else {
      setImgUrl("");
    }
  }, [selectedDoctor]);

  async function fetchTimesAllcode() {
    try {
      let res = await getAllcode(["TIME"]);
      if (res && res.data.errCode === 0) {
        setTimeList(res.data.allcodes);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <SystemHeader />
      <div className="container mx-auto px-2">
        <div className="text-center uppercase text-3xl font-medium pt-4 mb-10">
          Manage Doctor Schedule
        </div>
        <div className="container mx-auto px-2">
          <div className="flex flex-col md:flex-row md:justify-items-stretch md: gap-x-4 items-center">
            {/* doctor select Input */}
            <div className="w-full md:w-1/2">
              <label htmlFor="">Select Clinic</label>
              <Select
                isClearable={true}
                styles={customStyles}
                value={selectedDoctor ? selectedDoctor : null}
                onChange={setSelectedDoctor}
                options={doctorsOptions}
              />
            </div>
            {/* doctor select Input */}
            {/* Img Input */}
            <div className="w-full md:w-1/2">
              <div className="form-control w-ful items-center">
                <label className="label" htmlFor="province">
                  <span className="label-text">Avatar</span>
                </label>
                <div>
                  <img
                    src={imgUrl}
                    className="w-40 h-40 rounded-full border-slate-500 border-2"
                  />
                </div>
              </div>
            </div>
            {/* Img Input */}
          </div>
          <div className="divider"></div>
          <div className="p-4">
            <div className="flex w-full flex-col md:flex-row">
              <div className=" w-full md:w-1/3  place-items-center">
                <label htmlFor="date-picker">
                  <i className="fa-regular fa-calendar-days"></i> Pick a date
                </label>
                <DatePicker
                  id="date-picker"
                  className="border-2 hover:cursor-pointer border-slate-400 p-2"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="divider divider-horizontal"></div>
              <div className=" w-ful">
                <div className="text-xl items-center p-2">Schedule</div>
                <div className="flex flex-wrap gap-4">
                  {timeList &&
                    timeList.length > 0 &&
                    timeList.map((item, index) => {
                      return (
                        <div key={index}>
                          <button
                            className={
                              item.selected
                                ? "btn btn-success w-36"
                                : "btn btn-outline btn-success w-36"
                            }
                            onClick={() => {
                              item.selected = !item.selected;
                              setClickTime(!clickTime);
                            }}
                          >
                            {item.value}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
