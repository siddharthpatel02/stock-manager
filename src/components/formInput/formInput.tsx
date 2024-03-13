import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import "./formInput.scss";
const FormInput = ({
  id,
  children,
  type,
  isTextArea = false,
  register,
  errors,
  className,
}: {
  id: string;
  children: string;
  type: string;
  isTextArea?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  className?: string;
}) => {
  return (
    <div className={`input ${className}`}>
      <label className="input-label" htmlFor={id}>
        {children}
      </label>
      {isTextArea ? (
        <textarea
          {...register(id, {
            required: `Field ${children} is mandatory`,
          })}
          className="input-element"
          id={id}
        />
      ) : (
        <input
          {...(type === "text"
            ? register(id, {
                required: `Field ${children} is mandatory`,
              })
            : type === "number"
            ? register(id, {
                valueAsNumber: true,
                required: `Field ${children} is mandatory`,
                min: { value: 1, message: `${children} cannot be less than 1` },
              })
            : type === "file"
            ? register(id, { required: "Select an file to upload" })
            : {})}
          style={type === "file" ? { border: "none" } : {}}
          className="input-element"
          type={type}
          id={id}
          // placeholder={`Enter ${label}`}
        />
      )}
      {errors[id] && (
        <p className="input-error">{errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default FormInput;
