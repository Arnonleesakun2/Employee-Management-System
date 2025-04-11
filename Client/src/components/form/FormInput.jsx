import { Input } from "@/components/ui/input";

const FormInput = ({ name, type, errors, register,defuiltValue }) => {
  return (
    <div>
      <label className="capitalize mb-2" htmlFor={name}>
        {name}
      </label>
      <Input
        {...register(name)}
        type={type}
        placeholder={name}
        name={name}
        defaultValue={defuiltValue || ""}
        required
      />
      {errors[name] && (
        <span className="text-red-400 text-sm mt-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default FormInput;
