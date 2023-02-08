import { Timeline } from "flowbite-react"
import { Button } from "flowbite-react"
import { useState, useEffect } from "react";
import Link from "next/link";
import ErrorPage from 'next/error'
import { FaGoogle } from 'react-icons/fa';


import Siren from "@/pages/svgs/siren";


export default function TimeLine() {
    const [count, setCount] = useState(1);
    const [results, setResults] = useState([]);


    const onPageChange = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    useEffect(() => {
        fetch(`https://api.afetharita.com/feeds/locations?format=json&page=${count}`)
            .then((res) => res.json())
            .then((res) => {
                setResults(res.results);
                console.log(res.results)
            })
            .catch((error) => {
                console.error(error);
            });
    }, [count]);


    if (!results) {
        <ErrorPage statusCode={404} />
    }

    return (
        <Timeline>
            {results.map((data) => (
                <Timeline.Item key={data.id}>
                    <Timeline.Point icon={Siren} />
                    <Timeline.Content>
                        <Timeline.Time className="text-red-600">
                            Deprem acil !
                        </Timeline.Time>

                        <Timeline.Title>
                            {data.raw.channel}
                        </Timeline.Title>
                        <Timeline.Body>
                            {data.raw.full_text}

                            <div className="rounded-md  border-2 p-3 m-5">

                                <div className="text-emerald-600">
                                    adres : {data.formatted_address}
                                </div>

                                <div className="mt-5">
                                    <div className=" grid gap-[5px] grid-cols-2 md:grid-cols-5 ">
                                        <Link href={`https://www.google.com/maps?saddr=My+Location&daddr=${data.viewport.northeast.lat},${data.viewport.northeast.lng}`} target='_blank'>

                                            <Button color="gray">

                                                Google haritalarda aç
                                            </Button>
                                        </Link>

                                        <Link href={`http://maps.apple.com/?ll=${data.viewport.northeast.lat},${data.viewport.northeast.lng}&z=18`} target='_blank'>

                                            <Button color="gray" className="">

                                                Apple haritalarda aç
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Timeline.Body>


                    </Timeline.Content>
                </Timeline.Item>
            ))}


            <div className="flex flex-row mx-auto justify-center">
                <button onClick={() => {
                    setCount(count - 1)
                    onPageChange()
                }} type="button" className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
                    <div className="flex flex-row align-middle">
                        <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <p className="ml-2">Geri</p>
                    </div>
                </button>
                <button onClick={() => {
                    setCount(count + 1)
                    onPageChange()
                }} type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3">
                    <div className="flex flex-row align-middle">
                        <span className="mr-2">İleri</span>
                        <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </button>
            </div>

        </Timeline>

    )
}