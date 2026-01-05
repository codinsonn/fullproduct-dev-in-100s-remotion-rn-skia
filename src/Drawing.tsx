import { Skia, Text } from "@shopify/react-native-skia"
import React from "react"
import { useVideoConfig } from "remotion"
import { useTypefaces } from "./AssetManager"
import { SkiaNeon } from "./SkiaNeon"

/* --- <Drawing/> ------------------------------------------------------------------------------ */

export const Drawing: React.FC<{
    readonly color1: string
    readonly color2: string
}> = ({ color1, color2 }) => {
    //
    // Hooks
    const { width, height } = useVideoConfig()

    // Assets
    const typefaces = useTypefaces()
    const smallFont = Skia.Font(typefaces.Roboto, 30)

    // -- Render --

    return (
        <>
            <SkiaNeon color1={color1} color2={color2} />
            <Text
                x={width / 2 - 270}
                y={height * 0.9}
                font={smallFont}
                text="Edit src/HelloSkia.tsx and save to refresh."
                color="white"
            />
        </>
    )
}
