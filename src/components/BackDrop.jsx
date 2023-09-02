const BackDrop = (props) => {
  return (
    <div
      className="fixed inset-0 w-full h-screen bg-black bg-opacity-75 backdrop:blur-sm flex justify-center items-center z-10"
      onClick={props.handleClose}
    ></div>
  );
};

export default BackDrop;
