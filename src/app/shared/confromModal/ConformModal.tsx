import React from 'react';

const ConformModal = ({
  title,
  message,
  data,
  action,
  textColor,
  addNumber,
  number,
}: any) => {
  return (
    <>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="conform-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3
            className={`font-bold text-lg  ${
              textColor === 'delete' && 'text-red-400 '
            } ${textColor === 'booked' && 'text-[#33a06d]'}   `}
          >
            {title}
          </h3>

          <p className="py-4">{message}</p>
          {addNumber && (
            <input
              type="number"
              className="   input border-green-400  border-2 w-full    "
              placeholder=" Enter  your phone number"
              onChange={(e: any) => number(e.target.value)}
            />
          )}
          <div className="modal-action">
            <label htmlFor="conform-modal" className="btn  text-white">
              cancel
            </label>

            <button
              className={`btn  text-white ${
                textColor === 'delete' && '  btn-error '
              } ${
                textColor === 'booked' && '    btn-success '
              }   btn-accent   border-0  `}
              onClick={() => action(data._id)}
            >
              {textColor === 'delete' ? 'Delete' : 'booked'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConformModal;
