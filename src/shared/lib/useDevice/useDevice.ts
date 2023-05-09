import { useWindowDimensions } from "../useWindowDimensions/useWindowDimensions"
import { isMobile } from "../../constants/adaptive"

type Device = "DESKTOP" | "MOBILE"

export const useDevice = (): Device => {
	const { width } = useWindowDimensions()

	return width > isMobile ? "DESKTOP" : "MOBILE"
}
