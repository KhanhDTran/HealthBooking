import doctorImg from "../../../../assets/images/doctors/admindoctor.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalCreateDoctor(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        htmlFor="create-doctor-modal"
        className="card w-ful bg-base-100 shadow-xl hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:cursor-pointer"
        onClick={() => {
          openModal();
        }}
      >
        <figure className="px-10 pt-10">
          <img src={doctorImg} alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Doctors</h2>
          <p>Create a doctor</p>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
