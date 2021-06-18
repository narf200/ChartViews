import React, {useEffect, useState} from "react";
import {Bar, defaults} from 'react-chartjs-2'

defaults.plugins.legend.position = 'bottom'

const BarChart = () => {

    const [numberOfUsers, setNumberOfUsers] = useState([]);
    const [youngViews, setYoungViews] = useState([]);
    const [kidsViews, setKidsViews] = useState([]);
    const [adultViews, setAdultViews] = useState([]);
    const [oldViews, setOldViews] = useState([]);
    const [undefinedViews, setUndefinedViews] = useState([]);

    let uniqDays = (data) => {

        //    фильтрация массива объектов с датами

        const dayList = []

        data.data["o"].forEach((device) => {
            device['o'].forEach((day) => {
                dayList.push(day)
            })
        })
        // console.log('dayList',dayList)

        //                   Фильтрация объектов с уникальными датами

        let uniqueDayList = [];
        dayList.filter(function (item) {
            let i = uniqueDayList.findIndex(x => (x.n === item.n && x.dayList === item.dayList));
            if (i <= -1) {
                uniqueDayList.push(item);
            }
            return null;
        });
        // console.log('uniqueDayList',uniqueDayList)
        return uniqueDayList
    }

    const funcYoung = (numberOfUsers) => {
        const youngsters = []

        numberOfUsers.forEach((day) => {
            day["o"].forEach((person) => {
                if(person["n"] === 'young') {
                    youngsters.push(person["v"])
                }
            })
        })
        console.log('youngsters',youngsters)
        return youngsters

    }

    const funcKids = (numberOfUsers) => {
        const kidsViews1 = []

        numberOfUsers.forEach((day) => {
            day["o"].forEach((person) => {
                if(person["n"] === 'kid') {
                    kidsViews1.push(person["v"])
                }
            })
        })
        console.log("kidsViews1",kidsViews1)
        return kidsViews1
    }

    const funcAdult = (numberOfUsers) => {
        const adultViews1 = []

        numberOfUsers.forEach((day) => {
            day["o"].forEach((person) => {
                if(person["n"] === 'adult') {
                    adultViews1.push(person["v"])
                }
            })
        })
        console.log("adultViews1", adultViews1)
        return adultViews1
    }

    const funcOld = (numberOfUsers) => {
        const oldViews1 = []

        numberOfUsers.forEach((day) => {
            day["o"].forEach((person) => {
                if(person["n"] === 'old') {
                    oldViews1.push(person["v"])
                }
            })
        })
        console.log("oldViews1", oldViews1)
        return oldViews1
    }

    const funcUndefined = (numberOfUsers) => {
        const undefinedViews1 = []

        numberOfUsers.forEach((day) => {
            day["o"].forEach((person) => {
                if(person["n"] === 'undefined') {
                    undefinedViews1.push(person["v"])
                }
            })
        })
        console.log("undefinedViews1", undefinedViews1)
        return undefinedViews1
    }

    useEffect(() => {
        fetch('https://analytics.3divi.ru/api/v2/statistics/user/2088/devices/dates/ages/?key=d3aa35bde5ef46899b91aca9c66e174e&b=2020/03/08%2012:00:00&e=20\n' +
            '20/09/08%2012:00:00&tzo=0')
            .then(res => res.json())
            .then(data =>  {
                setNumberOfUsers(uniqDays(data));
                setYoungViews(funcYoung(numberOfUsers));
                setKidsViews(funcKids(numberOfUsers));
                setAdultViews(funcAdult(numberOfUsers));
                setOldViews(funcOld(numberOfUsers));
                setUndefinedViews(funcUndefined(numberOfUsers));
                }
            )
    },[])


    return (
        <div>
            {numberOfUsers && <Bar
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [
                        {
                            label: 'undefined',
                            data: undefinedViews,
                            backgroundColor: [
                                'rgb(127,125,125)'
                            ]
                        },
                        {
                            label: 'Kids',
                            data: kidsViews,
                            backgroundColor: [
                                'rgb(5,127,12)'
                            ]
                        },
                        {
                            label: 'Young',
                            data: youngViews,
                            backgroundColor: [
                                'rgb(13,137,211)'
                            ]
                        },
                        {
                            label: 'Adult',
                            data: adultViews,
                            backgroundColor: [
                                'rgb(4,41,164)'
                            ]
                        },
                        {
                            label: 'Old',
                            data: oldViews,
                            backgroundColor: [
                                'rgb(185,5,5)'
                            ]
                        }
                    ]
                }}
                height={200}
                width={400}
                options={
                    {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Total views: Age (by day of week)'
                            },
                        },
                        responsive: true,
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }
                }
            />}
        </div>
    )
}

export default BarChart


