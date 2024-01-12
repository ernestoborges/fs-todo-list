import { LuLoader } from "react-icons/lu";
export function LoadingSpin() {

    return <div className="w-full h-full flex-grow flex items-center justify-center text-primary-text">
        <LuLoader className="animate-spin" />
    </div>
}