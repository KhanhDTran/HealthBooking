export default function DoctorIntro(props) {
  return (
    <>
      {props.doctor && (
        <div className="" data-theme="cupcake">
          <div className="w-full flex flex-col md:flex-row align-center justify-center ">
            <div className="p-2">
              <div>
                <img
                  src={props.doctor.image}
                  className="w-40 h-40 rounded-full"
                />
              </div>
            </div>
            <div className="p-4 ">
              <span className="text-2xl font-semibold">
                {props.doctor.position.value} {props.doctor.user.firstName}{" "}
                {props.doctor.user.lastName}
              </span>
              <br />

              <div
                className="prose prose-neutral text-sm pt-2 "
                dangerouslySetInnerHTML={{
                  __html: props.doctor.description.split(".").join(".</br>"),
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
