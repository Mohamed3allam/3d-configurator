import React from "react";

const SidewayChoice = ({ children, setSide }) => {
    return (
        <>
            <div className="d-flex flex-column gap-5">
                <div>
                    <div className="sm:hidden">
                        <select
                            id="tabs"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option onClick={() => setSide("front")}>
                                Front
                            </option>
                            <option onClick={() => setSide("back")}>
                                Back
                            </option>
                            <option onClick={() => setSide("right")}>
                                Right
                            </option>
                            <option onClick={() => setSide("left")}>
                                Left
                            </option>
                        </select>
                    </div>
                    <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                        <li
                            className="w-full focus-within:z-10"
                            onClick={() => setSide("front")}
                        >
                            <a
                                href="#"
                                className="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
                                aria-current="page"
                            >
                                Front
                            </a>
                        </li>
                        <li
                            className="w-full focus-within:z-10"
                            onClick={() => setSide("back")}
                        >
                            <a
                                href="#"
                                className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                Back
                            </a>
                        </li>
                        <li
                            className="w-full focus-within:z-10"
                            onClick={() => setSide("right")}
                        >
                            <a
                                href="#"
                                className="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                Right
                            </a>
                        </li>
                        <li
                            className="w-full focus-within:z-10"
                            onClick={() => setSide("left")}
                        >
                            <a
                                href="#"
                                className="inline-block w-full p-4 bg-white border-s-0 border-gray-200 dark:border-gray-700 rounded-e-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                Left
                            </a>
                        </li>
                    </ul>
                </div>
                <>{children}</>
            </div>
        </>
    );
};

export default SidewayChoice;
