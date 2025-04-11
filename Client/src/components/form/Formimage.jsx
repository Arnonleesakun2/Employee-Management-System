import { Input } from "../ui/input";
import React, { useState } from "react";
import { RotateCw } from "lucide-react";
import { resizeImage } from "@/utils/resizeimage";
import { uploadImage } from "@/api/uploadfile";
import { toast } from "sonner";

const Formimage = ({ setValue, errors }) => {
  const [isLoading, setIsLoading] = useState(false);
  const hdlOnchange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    if (!file) return;
    try {
      const resizedImage = await resizeImage(file);
      const res = await uploadImage(resizedImage);
      toast.success(res.data.message,{
        position: "bottom-left",
      });
      setValue("image", res.data.result);
      setIsLoading(false);
    } catch (error) {
      toast(error);
      toast.error(error,{
        position: "bottom-left",
      });
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <label className="font-medium">Image</label>
      <div className="flex gap-2 items-center">
        <Input type="file" accept="image/*" onChange={hdlOnchange} />
        {isLoading && <RotateCw className="animate-spin" />}
      </div>

      {errors.image && (
        <p className="text-red-400 text-sm">{errors.image.message}</p>
      )}
    </div>
  );
};

export default Formimage;
