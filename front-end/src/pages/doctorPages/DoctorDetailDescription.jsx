export default function DoctorDetailDescription(props) {
  return (
    <div className="" data-theme="">
      {props.doctor && props.doctor.markdownHtml && (
        <div
          className="prose prose-neutral mx-auto text-md p-4 pt-8 "
          dangerouslySetInnerHTML={{
            __html: props.doctor.markdownHtml,
          }}
        ></div>
      )}
    </div>
  );
}
