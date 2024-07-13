import { Quote } from "../components/ui/Quote";
import { SigninAuth } from "../components/ui/SigninAuth";

export const Signin = () => {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="">
        <SigninAuth />
      </div>
      <div className="max-lg:hidden">
        <Quote />
      </div>
    </div>
  );
};
