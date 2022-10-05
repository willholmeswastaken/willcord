import { offset, shift, useFloating } from "@floating-ui/react-dom";
import { Popover } from "@headlessui/react";
import { AvatarWithStatus } from "./AvatarWithStatus";
import UserDisplay from "./UserDisplay";

const MemberCard = () => {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "left-start",
    strategy: "fixed",
    middleware: [offset(24), shift()],
  });

  return (
    <Popover>
      <Popover.Button ref={reference}>
        <div className="flex items-center gap-2 relative">
          <div className="text-gray-700">
            <AvatarWithStatus />
          </div>
          <div className="text-[#C20D90] font-semibold">devwillholmes</div>
        </div>
      </Popover.Button>

      <Popover.Panel
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
      >
        <UserDisplay />
      </Popover.Panel>
    </Popover>
  );
}

export default MemberCard
