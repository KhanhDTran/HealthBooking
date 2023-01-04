import moment from "moment";
import "moment/locale/vi";
import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorSchedule } from "../../store/actions/scheduleAction";
import { NumericFormat } from "react-number-format";
import BookingModal from "./BookingModal";

moment().format();

export default function DoctorSchedule(props) {
  const dispatch = useDispatch();
  const [daysList, setDaysList] = useState([]);
  let [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  let [selectedTime, setSelectedTime] = useState({});
  let { schedules } = useSelector((state) => state.schedule);
  const [currentDay, setCurrentDay] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setDaysList(getArrDays());
    setSelectedDate(currentDay);
  }, []);

  useEffect(() => {
    if (openModal) {
      if (document.getElementById("booking-modal"))
        document.getElementById("booking-modal").checked = true;
      document.querySelector("body").style.overflow = "hidden";
    } else {
      if (document.getElementById("booking-modal"))
        document.getElementById("booking-modal").checked = false;
      document.querySelector("body").style = "";
    }
  }, [openModal]);

  useEffect(() => {
    if (props.doctor && props.doctor._id) {
      if (
        moment().hour() >= 17 ||
        (moment().hour() === 16 && moment().minute() >= 30)
      ) {
        let today = new Date(currentDay);
        let tomorrow = new Date(today.setDate(today.getDate() + 1));
        dispatch(
          fetchDoctorSchedule({
            doctor: props.doctor._id,
            date: tomorrow,
          })
        );
        setSelectedDate(tomorrow);
      } else {
        dispatch(
          fetchDoctorSchedule({
            doctor: props.doctor._id,
            date: currentDay.toDateString(),
          })
        );
      }
    }
  }, [props.doctor]);

  function getArrDays() {
    let result = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (i === 0) {
        obj.label = "Today - " + moment(currentDay).format("DD-MM-yyyy");
        obj.value = currentDay;
      } else {
        obj.label =
          moment(currentDay).add(i, "days").format("ddd") +
          " - " +
          moment(currentDay).add(i, "days").format("DD-MM-yyyy");
        let day = new Date(currentDay);
        day = new Date(day.setDate(day.getDate() + i));
        obj.value = day;
      }
      result.push(obj);
    }
    if (
      moment().hour() >= 17 ||
      (moment().hour() === 16 && moment().minute() >= 30)
    )
      result.shift();
    return result;
  }

  function handleSelectDay(day) {
    if (props.doctor && props.doctor._id) {
      dispatch(
        fetchDoctorSchedule({
          doctor: props.doctor._id,
          date: day,
        })
      );
    }
    setSelectedDate(new Date(day));
  }

  function handleOpenBookingModal(time) {
    setSelectedTime(time);
    setOpenModal(true);
  }

  return (
    <div className={openModal ? "overflow-y-hidden" : "pb-10"}>
      {props.doctor && (
        <>
          <div className="" data-theme="cupcake">
            <div className="container mx-auto">
              <div className="flex w-full flex-col md:flex-row ">
                <div className="grid flex flex-col gap-2   rounded-box place-items-center w-full md:w-4/6">
                  <select
                    className="select select-info w-48"
                    onChange={(e) => handleSelectDay(e.target.value)}
                  >
                    {!_.isEmpty(daysList) &&
                      daysList.map((item, index) => {
                        return (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                  <div className="flex flex-wrap gap-2 p-2 align-center ">
                    {!_.isEmpty(schedules) &&
                      schedules.map((item, index) => {
                        let hours = item.time.value.split(":")[0];
                        let minutes = item.time.value
                          .split(":")[1]
                          .split("-")[0];
                        if (
                          selectedDate.getDate() === moment().date() &&
                          (+hours > +moment().hour() ||
                            (+minutes >= +moment().minute() &&
                              +hours === +moment().hour()))
                        ) {
                          return (
                            <div key={index}>
                              <button
                                className="btn btn-info w-36 hover:-translate-y-1 text-white"
                                onClick={() => handleOpenBookingModal(item)}
                              >
                                {item.time.value}
                              </button>
                            </div>
                          );
                        }
                        if (selectedDate.getDate() !== moment().date()) {
                          return (
                            <div key={index}>
                              <button
                                className="btn btn-info w-36 hover:-translate-y-1 text-white"
                                onClick={() => handleOpenBookingModal(item)}
                              >
                                {item.time.value}
                              </button>
                            </div>
                          );
                        }
                      })}
                    {_.isEmpty(schedules) && (
                      <span>No Schedule on this date</span>
                    )}
                  </div>
                </div>
                {/* <i className="fa-regular fa-calendar-days"></i> Schedule */}
                <div className="divider md:divider-horizontal"></div>
                <div className="   rounded-box  w-full md:w-2/6">
                  {!_.isEmpty(props.doctor) && (
                    <div className="flex flex-col  p-2">
                      <div>
                        <span className="font-semibold">Địa chỉ khám</span>
                        <br />
                        <span>
                          <i className="fa-solid fa-location-dot p-2"></i>{" "}
                          {props.doctor.user.address},{" "}
                          {props.doctor.province.value}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold ">Giá khám</span>
                        <br />
                        <span>
                          <i className="fa-solid fa-dollar-sign p-2"></i>{" "}
                          <NumericFormat
                            type="text"
                            displayType="text"
                            value={props.doctor.price.value}
                            thousandSeparator={true}
                            suffix="VNĐ"
                          />
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold ">
                          Phương thức thanh toán
                        </span>
                        <br />
                        <span>
                          <i className="fa-regular fa-credit-card"></i>{" "}
                          {props.doctor.payment.value === "Tất cả" ? (
                            <>Thanh toán bằng tiền mặt và thẻ ATM</>
                          ) : (
                            <>Thanh toán bằng {props.doctor.payment.value}</>
                          )}
                        </span>
                      </div>
                      {!_.isEmpty(props.doctor.note) && (
                        <div>
                          <span className="font-semibold ">Lưu ý</span>
                          <br />
                          <span>
                            <i className="fa-solid fa-exclamation p-2"></i>{" "}
                            {props.doctor.note}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {openModal && (
            <BookingModal
              setOpenModal={setOpenModal}
              doctor={props.doctor}
              time={selectedTime}
            />
          )}
        </>
      )}
    </div>
  );
}
