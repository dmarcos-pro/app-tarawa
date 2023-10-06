import { useState, useEffect } from "react";

type DeviceType = "desktop" | "mobile";

const useWhichDevice = (): DeviceType => {
    const [currentDevice, setCurrentDevice] = useState<DeviceType>(
        window.innerWidth > 768 ? "desktop" : "mobile"
    );

    useEffect(() => {
        // define device support
        const updateDevice = () => {
            setCurrentDevice(window.innerWidth > 768 ? "desktop" : "mobile");
        };

        updateDevice();
        
        window.addEventListener('resize', updateDevice);

        return () => {
            window.removeEventListener('resize', updateDevice);
        };
    }, []);

    return currentDevice;
};

export default useWhichDevice;