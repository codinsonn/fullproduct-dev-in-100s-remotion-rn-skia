import { Composition } from "remotion"
import { HelloSkia, helloSkiaSchema } from "./HelloSkia"

/* --- Tips ------------------------------------------------------------------------------------ */

// -i- Each <Composition> is an entry in the sidebar!

/* --- <RemotionRoot/> ------------------------------------------------------------------------- */

export const RemotionRoot = () => (
    <>
        <Composition
            id="HelloSkia"
            component={HelloSkia}
            durationInFrames={150}
            fps={30}
            width={1920}
            height={1080}
            schema={helloSkiaSchema}
            defaultProps={{ color1: "#0d81ed", color2: "#c14dff" }}
        />
    </>
)
