import React from "react";

const ChooseDesign3d = () => {
    return (
        <>
            <ul
                className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0"
                role="tablist"
                data-twe-nav-ref
            >
                <li
                    role="presentation"
                    className="flex-grow basis-0 text-center"
                >
                    <a
                        href="#tabs-home02"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
                        data-twe-toggle="pill"
                        data-twe-target="#tabs-home02"
                        data-twe-nav-active
                        role="tab"
                        aria-controls="tabs-home02"
                        aria-selected="true"
                    >
                        Home
                    </a>
                </li>
                <li
                    role="presentation"
                    className="flex-grow basis-0 text-center"
                >
                    <a
                        href="#tabs-profile02"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
                        data-twe-toggle="pill"
                        data-twe-target="#tabs-profile02"
                        role="tab"
                        aria-controls="tabs-profile02"
                        aria-selected="false"
                    >
                        Profile
                    </a>
                </li>
                <li
                    role="presentation"
                    className="flex-grow basis-0 text-center"
                >
                    <a
                        href="#tabs-messages02"
                        className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[twe-nav-active]:border-primary data-[twe-nav-active]:text-primary dark:text-white/50 dark:hover:bg-neutral-700/60 dark:data-[twe-nav-active]:text-primary"
                        data-twe-toggle="pill"
                        data-twe-target="#tabs-messages02"
                        role="tab"
                        aria-controls="tabs-messages02"
                        aria-selected="false"
                    >
                        Messages
                    </a>
                </li>
                <li
                    role="presentation"
                    className="flex-grow basis-0 text-center"
                >
                    <a
                        href="#tabs-contact02"
                        className="disabled pointer-events-none my-2 block border-x-0 border-b-2 border-t-0 border-transparent bg-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-400 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent dark:text-neutral-600"
                        data-twe-toggle="pill"
                        data-twe-target="#tabs-contact02"
                        role="tab"
                        aria-controls="tabs-contact02"
                        aria-selected="false"
                    >
                        Contact
                    </a>
                </li>
            </ul>

            <div className="mb-6">
                <div
                    className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                    id="tabs-home02"
                    role="tabpanel"
                    aria-labelledby="tabs-home-tab02"
                    data-twe-tab-active
                >
                    Tab 1 content
                </div>
                <div
                    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                    id="tabs-profile02"
                    role="tabpanel"
                    aria-labelledby="tabs-profile-tab02"
                >
                    Tab 2 content
                </div>
                <div
                    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                    id="tabs-messages02"
                    role="tabpanel"
                    aria-labelledby="tabs-profile-tab02"
                >
                    Tab 3 content
                </div>
                <div
                    className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[twe-tab-active]:block"
                    id="tabs-contact02"
                    role="tabpanel"
                    aria-labelledby="tabs-contact-tab02"
                >
                    Tab 4 content
                </div>
            </div>
        </>
    );
};

export default ChooseDesign3d;
