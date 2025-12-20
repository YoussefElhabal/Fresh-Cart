import { FallingLines } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="h-screen bg-white flex justify-center items-center">
            <FallingLines
                color="#000"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    )
}