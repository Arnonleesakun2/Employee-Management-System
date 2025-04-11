import Formbutton from "@/components/form/Formbutton";
import Formimage from "@/components/form/Formimage";
import FormInput from "@/components/form/FormInput";
import Formposition from "@/components/form/Formposition";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/utils/schemas";
import { createEmployee } from "@/api/employee";
import { toast } from "sonner";

const CreateEmployee = () => {
  const { handleSubmit, setValue, register, formState, reset } = useForm({
    resolver: zodResolver(employeeSchema),
  });
  const { errors, isSubmitting } = formState;
  const hdlSubmit = async (data) => {
    try {
      await new Promise((resoLve) => setTimeout(resoLve, 2000));
      const res = await createEmployee(data);
      reset();
      toast.success(res.data.message, {
        position: "bottom-left",
      });
    } catch (error) {
      toast.success(error, {
        position: "bottom-left",
      });
    }
  };
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold">RegisterEmployee</h2>
      <form onSubmit={handleSubmit(hdlSubmit)}>
        <div className="md:grid md:grid-cols-2 md:space-y-0 gap-3 mt-3 space-y-3">
          <FormInput
            errors={errors}
            register={register}
            name="firstname"
            type="text"
          />
          <FormInput
            errors={errors}
            register={register}
            name="lastname"
            type="text"
          />
          <FormInput
            errors={errors}
            register={register}
            name="phone"
            type="number"
          />
          <FormInput
            errors={errors}
            register={register}
            name="email"
            type="email"
          />
          <FormInput
            errors={errors}
            register={register}
            name="address"
            type="text"
          />
          <Formposition
            errors={errors}
            setValue={setValue}
            name="position"
            register={register}
          />
          <Formimage setValue={setValue} errors={errors} />
        </div>
        <div className="mt-8">
          <Formbutton text="Register Employess" isPending={isSubmitting} />
        </div>
      </form>
    </section>
  );
};

export default CreateEmployee;
