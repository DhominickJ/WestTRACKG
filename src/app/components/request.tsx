import { Button } from "@/components/ui/button";

function RequestBtn( _text: any ) {
  return (
    // <button
    //   className="btn-floating btn-large waves-effect waves-light bg-red-600"
    //   type="button"
    // >
    //   <p className="text-center text-white left-5 top-5">{text}</p>
    // </button>
    <Button
      variant={"outline"}
      className="rounded-full bg-sky-400 absolute z-10"
    >
      Request Document
    </Button>
  );
}

export default RequestBtn;
