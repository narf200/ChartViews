import React, {useEffect, useLayoutEffect, useReducer, useState} from "react";
import {Bar, defaults} from 'react-chartjs-2'

defaults.plugins.legend.position = 'bottom'

const BarChart = () => {

    const [numberOfUsers, setNumberOfUsers] = useState([]);
    const [isPending, setIsPending] = useState(true)
    const [youngViews, setYoungViews] = useState([]);
    const [kidsViews, setKidsViews] = useState([]);
    const [adultViews, setAdultViews] = useState([]);
    const [oldViews, setOldViews] = useState([]);
    const [undefinedViews, setUndefinedViews] = useState([]);

    useEffect(() => {
        fetch('https://analytics.3divi.ru/api/v2/statistics/user/2088/devices/dates/ages/?key=d3aa35bde5ef46899b91aca9c66e174e&b=2020/03/08%2012:00:00&e=20\n' +
            '20/09/08%2012:00:00&tzo=0')
            .then(res => res.json())
            .then(data => {
                    setNumberOfUsers(uniqDays(data));
                    setIsPending(false)

                }
            )
    },[])

    useLayoutEffect(() => {
        setYoungViews(funcYoung(numberOfUsers));
        setKidsViews(funcKids(numberOfUsers));
        setAdultViews(funcAdult(numberOfUsers));
        setOldViews(funcOld(numberOfUsers));
        setUndefinedViews(funcUndefined(numberOfUsers));
    }, [isPending]);

    const uniqDays = (data) => {

        //    фильтрация массива объектов с датами

        let dayList = []

        data.data["o"].forEach((device) => {
            device['o'].forEach((day) => {
                dayList.push(day)
            })
        })

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
        let youngsters = []

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
        let kidsViews1 = []

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
        let adultViews1 = []

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
        let oldViews1 = []

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
        let undefinedViews1 = []

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




    return (
        <div className={"chartItems"}>
            {isPending && <div>Loading...</div>}
             <Bar
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    datasets: [
                        {
                            label: 'undefined',
                            data: undefinedViews,
                            backgroundColor: [
                                'rgba(127,125,125,0.2)'
                            ],
                            borderColor: [
                                    'rgba(127,125,125,1)'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Kids',
                            data: kidsViews,
                            backgroundColor: [
                                'rgba(5,127,12,0.2)'
                            ],
                            borderColor: [
                                'rgba(5,127,12,1)'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Young',
                            data: youngViews,
                            backgroundColor: [
                                'rgba(13,137,211,0.2)'
                            ],
                            borderColor: [
                                'rgba(13,137,211,1)'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Adult',
                            data: adultViews,
                            backgroundColor: [
                                'rgba(4,41,164,0.2)'
                            ],
                            borderColor: [
                                'rgba(4,41,164,1)'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Old',
                            data: oldViews,
                            backgroundColor: [
                                'rgba(185,5,5,0.2)'
                            ],
                            borderColor: [
                                'rgba(185,5,5,1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                }}
                options={
                    {
                        plugins: {
                            title: {
                                display: true,
                                text: 'Total views: Age (by day of week)'
                            },
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                stacked: true,
                                beginAtZero: true
                            },
                            y: {
                                stacked: true,
                                beginAtZero: true
                            }
                        }
                    }
                }
            />
        </div>
    )
}

export default BarChart


