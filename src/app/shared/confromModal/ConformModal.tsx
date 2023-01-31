import React from 'react';

const ConformModal = ({ title, message, data, action }: any) => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="conform-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">{title}</h3>

          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label htmlFor="conform-modal" className="btn">
              cancel
            </label>
            <button
              className="  btn btn-error"
              onClick={() => action(data._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConformModal;
