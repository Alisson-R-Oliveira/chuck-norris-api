import { FC } from "react";

interface TabsProps {
    openTab: number
    setOpenTab(active: number): void 
}

export const Tabs: FC<TabsProps> = ({ openTab, setOpenTab }) => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full">
                <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a 
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                  ? "text-white bg-indigo-700"
                                  : "text-indigo-700 bg-white")
                            }
                            onClick={e=> {
                                e.preventDefault();
                                setOpenTab(1);
                            }}
                            data-toggle="tab"
                            href="#link1"
                            role="tablist"
                        >
                            Categories
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a 
                            className={
                                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                  ? "text-white bg-indigo-700"
                                  : "text-indigo-700 bg-white")
                            }
                            onClick={e=> {
                                e.preventDefault()
                                setOpenTab(2)
                            }}
                            data-toggle="tab"
                            href="#link2"
                            role="tablist"
                        >
                            Search
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}