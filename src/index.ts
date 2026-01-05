import { LoadSkia } from "@shopify/react-native-skia/src/web"
import { registerRoot } from "remotion"

/* --- Init ------------------------------------------------------------------------------------ */

(async () => {
    // We have to wait for Skia to load before registering the root
    await LoadSkia()
    // Importing here to ensure Skia is loaded first
    const { RemotionRoot } = await import("./Root")
    // Register the root component of the Remotion video
    registerRoot(RemotionRoot)
})()
