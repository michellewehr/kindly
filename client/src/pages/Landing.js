import Icon from "../assets/images/icon.png";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className=" h-screen bg-cover bg-no-repeat center bg-[url('/assets/images/newVolunteer.png')]  flex justify-center">
      <div>
        <div className="shadow-lg h-max mt-24">
          <div className="flex flex-shrink-0 text-white">
            <div>
              <img className="fill-current h-32  mr-2" src={Icon} />
            </div>
            <span className=" text-4xl tracking-tight text-black	">
              <div>
                <h1 className="text-9xl text-black">Kindly</h1>
              </div>
            </span>
          </div>
          <p className="text-right text-xl p-4">It's cool to be kind.</p>

          {/* <Link>Get Started</Link> */}
        </div>

        {/* </div>
      <p>It's cool to be kind.</p>
      <p>
        Find volunteer opportunities and help those in need while earning kindly
        points.
      </p>
    </div> */}
        <Link to="/">
          <p className="text-center p-3 bg-sky-100 rounded p-3 text-lg bg-opacity-50">
            Find do good opportunities near you and earn kindly points now.
          </p>
        </Link>
      </div>
    </div>
  );
}
