import React, { useEffect, useState } from "react";

const Devices = () => {

    const [deviseListState, setDeviceListState] = useState([]);
    const [IsPending, setIsPending] = useState(true);

    let deviceListFunc = (data) => {
        const deviceList = [];

        data.data["o"].forEach((device) => {
            deviceList.push(device);

            console.log("deviceList", deviceList);
        });
        return deviceList;
    };

    useEffect(() => {
        fetch(
            "https://analytics.3divi.ru/api/v2/statistics/user/2088/devices/dates/ages/?key=d3aa35bde5ef46899b91aca9c66e174e&b=2020/03/08%2012:00:00&e=20\n" +
            "20/09/08%2012:00:00&tzo=0"
        )
            .then((res) => res.json())
            .then((data) => {
                setDeviceListState(deviceListFunc(data));
                console.log("deviceList", deviseListState);
                setIsPending(false);
            });
    }, []);

    return (

    <div className={"device"}>
        <h2>DeviceList</h2>
        {setIsPending && <div>
            {deviseListState.map((device) => (
                <div key={device.id}>
                    <h3>{device.n}</h3>
                </div>
            ))}
        </div>}
    </div>

    )
}

export default Devices
