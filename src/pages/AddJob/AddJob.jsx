import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AddJob = () => {
  const { user } = useAuth();

  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData.entries());
    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData);
    const { min, max, currency, ...newJob } = initialData;
    console.log(newJob);
    newJob.salaryRange = {
      min,
      max,
      currency,
    };
    newJob.requirements = newJob.requirements.split("\n");
    newJob.responsibilities = newJob.responsibilities.split("\n");
    console.log(newJob);

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job Has been added",
            showConfirmButton: false,
            timer: 1500,
          });
          Navigate("/myPostedJobs");
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl">Post a new Job</h2>
      <form onSubmit={handleAddJob} className="card-body">
        {/* Job title */}
        <fieldset className="fieldset">
          <label className="label">Job Title</label>
          <input
            type="text"
            name="title"
            className="input w-full"
            placeholder="Job Title"
            required
          />
          {/* job location */}
          <label className="label">Job Location</label>
          <input
            type="text"
            name="location"
            className="input w-full"
            placeholder="Job Location"
            required
          />
          {/* job type */}
          <label className="label">Job Type</label>
          <select defaultValue="Pick a Job Type" className="select w-full">
            <option disabled={true}>Pick a Job Type</option>
            <option>Full-time</option>
            <option>Intern</option>
            <option>Part-time</option>
          </select>
          {/* job Category */}
          <label className="label">Job Field</label>
          <select defaultValue="Pick a Job Field" className="select w-full">
            <option disabled={true}>Pick a Job Field</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Teaching</option>
          </select>
          {/* salary range */}
          <div className="space-y-4">
            {/* Salary Range - Min & Max */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="min-salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Minimum Salary
                </label>
                <input
                  type="number"
                  id="min-salary"
                  name="min"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 30000"
                  required
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="max-salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Salary
                </label>
                <input
                  type="number"
                  id="max-salary"
                  name="max"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 50000"
                  required
                  min="0"
                />
              </div>
            </div>

            {/* Currency Selector */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
              {/* Min Salary */}
              <div className="space-y-1">
                <label
                  htmlFor="min-salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Min Salary
                </label>
                <input
                  type="number"
                  id="min-salary"
                  name="min"
                  className="input input-bordered w-full"
                  placeholder="e.g. 30000"
                  required
                  min="0"
                />
              </div>

              {/* Max Salary */}
              <div className="space-y-1">
                <label
                  htmlFor="max-salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Salary
                </label>
                <input
                  type="number"
                  id="max-salary"
                  name="max"
                  className="input input-bordered w-full"
                  placeholder="e.g. 50000"
                  required
                  min="0"
                />
              </div>

              {/* Currency */}
              <div className="space-y-1">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="select select-bordered w-full"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select currency
                  </option>
                  <option value="BDT">BDT</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
          {/* job Description */}
          <label className="label">Job Description</label>

          <textarea
            className="textarea w-full"
            placeholder="Job Description"
            name="description"
            required
          ></textarea>

          {/* Company Name */}
          <div>
            <label className="label">Company Name</label>
            <input
              type="text"
              name="company"
              className="input w-full"
              placeholder="Company Name"
              required
            />
          </div>
          {/* job Requirements */}
          <div>
            <label className="label">Job Requirements</label>

            <textarea
              className="textarea w-full"
              placeholder="Each Requirements put in a new line"
              name="requirements"
              required
            ></textarea>
          </div>
          {/*  Responsibilities */}
          <div>
            <label className="label">Job Responsibilities</label>

            <textarea
              className="textarea w-full"
              placeholder="Write Each responsibility in a new line"
              name="responsibilities"
              required
            ></textarea>
          </div>
          {/* HR Name */}
          <div>
            <label className="label">HR Name</label>
            <input
              type="text"
              name="hr_name"
              className="input w-full"
              placeholder="HR Name"
              required
            />
          </div>
          {/* HR Email */}
          <div>
            <label className="label">HR Email</label>
            <input
              type="text"
              name="hr_email"
              defaultValue={user?.email}
              className="input w-full"
              placeholder="HR Email"
              required
            />
          </div>
          {/* Application Deadline */}
          <div>
            <label className="label">Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              className="input w-full"
              placeholder="Deadline"
              required
            />
          </div>
          {/* Company Logo Url */}
          <div>
            <label className="label">Company Logo URL</label>
            <input
              type="text"
              name="company-logo"
              className="input w-full"
              placeholder="Company Logo URL"
              required
            />
          </div>

          {/* submit button */}
          <button className="btn btn-neutral mt-4">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddJob;
