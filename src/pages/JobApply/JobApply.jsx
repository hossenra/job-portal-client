import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log(id, user);

  const submitJobApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    const resume = form.resume.value;

    // console.log(linkedin, github, resume);

    const jobApplication = {
      job_id: id,
      applicant_email: user.email,
      linkedin,
      github,
      resume,
    };

    fetch("http://localhost:3000/job-applications", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/myApplications");
        }
      });
  };

  return (
    <div className="card bg-base-100 w-full shadow-2xl">
      <h1 className="text-5xl text-center font-bold">
        Apply Job and Good Luck!
      </h1>
      <form onSubmit={submitJobApplication} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Linkedin Url</label>
          <input
            name="linkedin"
            type="url"
            className="input w-full"
            placeholder="LinkedIn Url"
          />
          <label className="label">Github Url</label>
          <input
            name="github"
            type="url"
            className="input w-full"
            placeholder="Github Url"
          />
          <label className="label">Resume Url</label>
          <input
            name="resume"
            type="url"
            className="input w-full"
            placeholder="Resume Url"
          />
          <button className="btn btn-neutral mt-4 w-full">Apply</button>
        </fieldset>
      </form>
    </div>
  );
};

export default JobApply;
