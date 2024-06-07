import { timelineDummyData } from "../../../routes/Navigations";
import { TbWorld } from "react-icons/tb";

const BusinessTimeline = () => {
  return (
    <section>
        <section className="w-full h-full flex flex-col gap-8 sm:items-end p-8">
            {timelineDummyData?.map((data, index) => (
                <div key={index} className="flex flex-col gap-2 p-2 sm:p-4 w-full rounded-lg border border-gray-300">
                    <h2 className="font-poppins font-medium text-textDark text-base sm:text-lg">{data.timestamp}</h2>
                    <ul>
                        {data.details?.map((detail, index) => (
                            <li key={index} className="businessTimelineSibling flex gap-2">
                                <div className="w-full max-w-12 h-full rounded-full overflow-hidden">
                                    <img src={detail.timelineImg} alt="post id profile display picture" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-roboto font-light text-textDark text-base sm:text-lg">
                                        <span className="font-normal">{detail.timelineUserName} </span> {detail.timelineReaction}{detail.timelineReaction === "commented" && " on"} <span className="font-normal">{detail.timelinePostIdUsername}</span>&#39;s <span className="font-normal">post</span>.
                                    </h3>
                                    <p className="font-roboto font-light text-textDark text-sm sm:text-base w-full">{detail.timelinePostIdDescription}</p>
                                    <div className="flex items-center gap-1">
                                        <TbWorld className="w-3 h-3" />
                                        <p className="font-poppins font-extralight text-textDark text-xs">Public</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            ))}

        </section>
    </section>
  )
}

export default BusinessTimeline;