import { useLocation } from "react-router-dom";
import { Pages } from "@/constants/enums";

export function useCurrentManageSection() {
    const location = useLocation();

    if (
        location.pathname.endsWith(Pages.GOALS) ||
        location.pathname.endsWith(Pages.MANAGE)
    ) {
        return "goals";
    }
    if (location.pathname.endsWith(Pages.BASICS)) return "basics";
    if (location.pathname.endsWith(Pages.PRICING)) return "pricing";
    if (location.pathname.endsWith(Pages.AVAILABILITY)) return "availability";

    return null;
}
