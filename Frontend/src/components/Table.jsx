import React from "react";

const Table = ({
  el,
  index,
  handleEdit,
  handleDelete,
  handleCheckboxChange,
  selectedRows
}) => {
  return (
    <>
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id={`checkbox-table-${index}`}
                type="checkbox"
                onChange={()=>{handleCheckboxChange(el)}}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor={`checkbox-table-${index}`} className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
          >
            {index + 1}
          </th>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white"
          >
            {el.name}
          </th>
          <td className="px-6 py-4font-medium text-black whitespace-nowrap dark:text-white">{el.phone}</td>
          <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">{el.email}</td>
          <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">{`${el.hobbies} `}</td>
          <td className="px-6 py-4 flex space-x-2">
            <button
              onClick={() => {
                handleEdit(el);
              }}
              className="font-medium bg-blue-500 rounded-md p-1 text-white hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete(el._id);
              }}
              className="font-medium ml-2 bg-red-500 p-1 rounded-md text-white hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Table;
