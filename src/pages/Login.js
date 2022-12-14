import { useForm } from "react-hook-form";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { signIn, signInWithGoogle } = useContext(GlobalContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    signIn(data.emailInput, data.passwordInput).then(() => {
      navigate("/");
    });
  };

  const onSignInWithGoogle = (event) => {
    event.preventDefault();
    signInWithGoogle("signInWithPopup");
  };

  return (
    <div className="PageWrapper">
      <div className="Login CardStyling card">
        <div className="card-header">Login</div>
        <div className="card-text">Please log in to your account</div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
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

            <div className="mb-3 w-full d-flex justify-content-start align-items-center gap-2">
              <button type="submit" className="btn btn-primary mb-3" disabled={!isValid}>
                Login
              </button>
              <button onClick={onSignInWithGoogle} className="btn btn-outline-secondary mb-3">
                Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
