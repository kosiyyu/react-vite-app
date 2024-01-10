import { useContext, useEffect, useState } from "react"
import TagCorrect from "../../components/tags/TagCorrect";
import TagNormal from "../../components/tags/TagNormal";
import useIsMount from "../../hooks/useIsMount";
import { SearchTokenContext } from "../../context/SearchTokenProvider";

const AdditionalData = () => {
    const [formData, setFormData] = useState({
        // Add your form fields here
    });

    const handleReset = () => {
        setFormData({
            // Reset the form fields here
        });
    };

    const handleApply = () => {
        // Handle form submission here
    };

    return (
        <div>
            <form>
                {/* Add your form fields here */}
            </form>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleApply}>Apply</button>
        </div>
    );
};

export default AdditionalData;
