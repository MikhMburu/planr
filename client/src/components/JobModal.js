import React, { useState, useEffect } from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux/actions";
import M from "materialize-css/dist/js/materialize.min.js";

const JobModal = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const { saveJob, updateJob } = bindActionCreators(actionCreators, dispatch);
  const selected = useSelector((state) => state.jobs.selected_job);

  // Component State
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setDesc(selected.description);
    }
  }, [selected]);
  // Function Definition
  const onSubmit = async (e) => {
    e.preventDefault();
    const job = { title, description };
    try {
      if (!title) {
        return M.toast({
          html: "Job needs a title.",
        });
      }
      if (selected) {
        const res = await axios.post(`/routes/api/jobs/${selected._id}`, job, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        updateJob(res.data.job);
        M.toast({ html: res.data.msg });
      } else {
        const res = await axios.post("/routes/api/jobs/create-job", job, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        saveJob(res.data.job);
        M.toast({ html: res.data.msg });
      }
      setTitle("");
      setDesc("");
    } catch (err) {
      // M.toast({html: res.data.errmsg})
      console.log(err);
    }
  };
  return (
    <div id="add-job" className="modal modal-fixed-footer">
      <form onSubmit={onSubmit}>
        <div className="modal-content">
          <h4 className="blue-text darken-2">Add Project</h4>
          <p className="flow-text">
            A job/project can have several tasks under it. Add a job to group
            several related tasks. To see your jobs, check the left panel. Click
            on a job to see all the tasks on the main panel.
          </p>

          <div className="row">
            <div className="input-field col s12">
              <input
                name="title"
                type="text"
                className="validate"
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="title">Job</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <textarea
                name="description"
                className="materialize-textarea"
                onChange={(e) => setDesc(e.target.value)}
                value={description}
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="submit"
            className="modal-close waves-effect waves-blue btn-flat"
          >
            Save Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobModal;
