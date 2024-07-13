import { Quote } from "../components/ui/Quote";
import { SignupAuth } from "../components/ui/SignupAuth";

export const Signup = () => {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="max-lg:hidden">
        <Quote />
      </div>
      <div className="col-span-1">
        <SignupAuth />
      </div>
    </div>
  );
};
