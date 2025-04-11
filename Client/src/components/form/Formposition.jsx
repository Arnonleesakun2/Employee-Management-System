import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { positions } from "@/utils/position";

const Formposition = ({ name, register, setValue, errors, defuiltValue }) => {
  return (
    <div className="">
      <label className="capitalize mb-2" htmlFor={name}>
        {name}
      </label>
      <input hidden type="text" name={name} {...register(name)} />
      <Select onValueChange={(value) => setValue(name, value)} required>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={defuiltValue || "Please Selelect Position"}
          />
        </SelectTrigger>
        <SelectContent>
          {positions.map((item) => {
            return (
              <SelectItem key={item.label} value={item.label}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {errors[name] && (
        <span className="text-red-400 text-sm mt-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default Formposition;
