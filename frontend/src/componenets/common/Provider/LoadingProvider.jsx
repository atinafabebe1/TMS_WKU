import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div
      className="p-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="lg"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </Button>{" "}
        {/* <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button> */}
      </>
    </div>
  );
}

export default Loading;
