import { offset, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import moment from "moment";
import { Tooltip } from "../Tooltip";

interface Props {
    username: string;
    content: string;
    sentAt: Date;
    userImage: string;
}

export default function MessageRow({ username, content, sentAt, userImage }: Props) {
    const { x, y, reference, floating, strategy } = useFloating({
        placement: "right-end",
        strategy: "fixed",
        middleware: [offset(24), shift()],
    });

    const sentAtParsed: string = moment(sentAt).calendar();

    return (
        <Tooltip contents="hello" placement="top-end" offsetAmount={-12}>
            <div className="flex gap-4 hover:bg-gray-800/30 p-2">

                <img className="w-12 h-12 bg-indigo-600 rounded-full flex-shrink-0 cursor-pointer" src={userImage} alt={`${username}'s image`} />
                <div className="flex flex-col">
                    <div className="flex items-center gap-4">
                        <div className="text-red-500 font-semibold cursor-pointer hover:underline hover:underline-offset-2">
                            {username}
                        </div>
                        <div className="text-gray-500 text-xs">{sentAtParsed}</div>
                    </div>
                    <div className="text-white">{content}</div>
                </div>
            </div>
        </Tooltip>
    );
}