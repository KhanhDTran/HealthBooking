import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorById } from "../../services/doctorService";
import DoctorDetailDescription from "./DoctorDetailDescription";
import Footer from "../../components/Footer";
import DoctorIntro from "./DoctorIntro";
import DoctorSchedule from "./DoctorSchedule";

export default function DetailDoctor() {
  let { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctor();
  }, []);

  async function fetchDoctor() {
    try {
      let res = await getDoctorById(id);
      setDoctor(res.data.doctor);
    } catch (e) {
      console.log(e);
    }
  }

  console.log(doctor);

  return (
    <>
      <Header />
      <DoctorIntro doctor={doctor} />
      <DoctorSchedule doctor={doctor} />
      <DoctorDetailDescription doctor={doctor} />
      <Footer />
    </>
  );
}
