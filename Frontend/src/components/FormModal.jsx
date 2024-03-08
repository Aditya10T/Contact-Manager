import React, { useState, useRef, useEffect } from "react";

const FormModal = ({ setAdd, handleSubmit, handleOnChange, rest,setRest }) => {
    const [hobby, setHobby] = useState("");
    const hobbyRef = useRef();

    const onEnter = (e) => {
       setHobby(e.target.value);
    }

    useEffect(() => {
        const handleKeyUp = (event) => {
            console.log(hobby); // This will now have the correct value
    
            if (event.keyCode === 13) {
                console.log(event.keyCode);
                let dat = rest.hobbies;
                dat.push(hobby);
                setRest({
                    ...rest,
                    hobbies: dat,
                });
                setHobby("");
            }
        };

        const a = hobbyRef.current;
        a.addEventListener("keyup", handleKeyUp);
    
        // Cleanup the event listener when the component unmounts
        return () => {
            a.removeEventListener("keyup", handleKeyUp);
        };
    }, [hobby, rest, setRest]);

  return (
    <>
      {(
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${
           "" 
          }`}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <input
                    className="rounded-md border-2 w-full p-2 mt-2"
                    type="String"
                    name="name"
                    placeholder="Name"
                    onChange={handleOnChange}
                    value={rest.name}
                    required
                  ></input>
                  <input
                    className="rounded-md border-2 w-full p-2 mt-2"
                    type="Number"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleOnChange}
                    value={rest.phone}
                    required
                  ></input>
                  <input
                    className="rounded-md border-2 w-full p-2 mt-2"
                    type="Email"
                    name="email"
                    placeholder="Email"
                    onChange={handleOnChange}
                    value = {rest.email}
                    required
                  ></input>
                  <input
                    className="rounded-md border-2 w-full p-2 mt-2"
                    type="String"
                    name="hobby"
                    placeholder="Hobbies"
                    onChange={onEnter}
                    value = {hobby}
                    ref={hobbyRef}
                  ></input>
                  <div className="mt-5">

                  {rest.hobbies && 
                        rest.hobbies.map((hobby, index)=>{
                            return(
                                <span className="m-1 px-2 py-2 bg-red-100 rounded-xl" key={index}>
                                    {hobby}
                                </span>
                            )
                        }
                        )}
                        </div>
                  <button
                  type="Submit"
                  onClick={handleSubmit}
                  className="w-full mt-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 hover:bg-indigo-800 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
                </button>
                <button
                  onClick={() => {
                    // console.log("band kr rhe")
                    setHobby("");
                    setRest({
                      name:"",
                      email:"",
                      phone:"",
                      hobbies:[]
                    })
                    setAdd(false);
                  }}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default FormModal;
