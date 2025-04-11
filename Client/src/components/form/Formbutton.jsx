import { RotateCw } from "lucide-react";
import { Button } from "../ui/button";

const Formbutton = ({ text, isPending }) => {
  return (
    <div className="flex justify-center">
      <Button className="cursor-pointer" disabled={isPending} variant="outline" type="submit">
        {isPending ? (
          <>
            <RotateCw className="animate-spin" />
            <span>Please wait...</span>
          </>
        ) : (
          <p>{text}</p>
        )}
      </Button>
    </div>
  );
};

export default Formbutton;
