import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export const Login = () => {
  const { signIn } = useContext(GlobalContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    signIn(data.emailInput, data.passwordInput).then(() => {
      window.location.pathname = "/";
    });
  };

  return (
    <div className="PageWrapper">
      <div className="Login CardStyling card">
        <div className="card-header">Login</div>
        <div className="card-text">Please log in to your account</div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="e.g. john.doe@email.com"
                {...register("emailInput", { required: true })}
              ></input>
              {errors.emailInput && <span className="mt-2">This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                {...register("passwordInput", { required: true })}
              ></input>
              {errors.passwordInput && <span className="mt-2">This field is required</span>}
            </div>
            <button type="submit" className="btn btn-primary mb-3" disabled={!isValid}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
