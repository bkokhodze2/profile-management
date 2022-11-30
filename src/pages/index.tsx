import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Donut from "../components/charts/donut";
import Layout from "../components/layouts/profile-layout";
import {userBgIcon} from "../../public/images/icons";
import Cards from "../../public/images/icons/nav/navCards";
import Points from "../../public/images/icons/nav/navPoints";
import CountUp from 'react-countup';
import Tickets from "../../public/images/icons/nav/navTickets";
import Slider from "../components/UI/slider/tickets";

export default function Profile() {
  return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/public/favicon.ico"/>
        </Head>

        <div className={"grid grid-cols-2 gap-[30px]"}>
          <div className={"bg-[white] flex items-center rounded-xl p-[30px] relative"}>
            <div className={"w-[88px] h-[88px] mr-5"}>
              <img src={IMAGES.avatar.src} alt={"avatar"}/>
            </div>
            <p className={"text-dark6 text-[18px]"}>ვანო თვაური</p>
            <div className={"absolute right-6 bottom-0"}>
              <Image src={ICONS.userBgIcon} alt={"background"}/>
            </div>
            <div className={"absolute right-6 top-6 cursor-pointer"}>
              <Image src={ICONS.edit} alt={"edit icon"}/>
            </div>
          </div>
          <div
              className={"bg-[white] rounded-xl p-[30px] pb-[22px] pt-[24px] pr-[24px] flex justify-between items-start relative"}>
            <div className={"flex h-full"}>
              <div className={"h-full"}>
                <p className={"text-base text-dark font-bold"}>ბალანსი</p>
                <p className={"text-[24px] text-dark mb-[17px] "}>
                  <CountUp duration={1}
                           end={12567}
                           separator=","
                      // decimals={4}
                           decimal="," start={12567 * 0.85}/>
                </p>
                <span className={"text-[14px] text-[#9766F0] cursor-pointer"}>+ ბალანსის შევსება</span>
              </div>
              <div>
                <p className={"text-base text-dark font-bold"}>ID</p>
                <p className={"text-dark7 text-base"}>01211098145</p>
              </div>
            </div>

            <div className={"absolute right-0 bottom-0"}>
              <Image src={ICONS.balance} alt={"background"}/>
            </div>

            <div className={"rounded-[50%] flex justify-center items-center bg-[#F5CE5A] w-[44px] h-[44px]"}>
              <Cards color={"#FFFFFF"}/>
            </div>

          </div>
          <div className={"bg-[white] pt-[24px] rounded-xl pr-[24px] pl-[30px] pb-[30px] relative"}>
            <div className={"flex justify-between items-center"}>
              <p className={"text-base text-dark font-bold"}>ქულები</p>
              <div className={"rounded-[50%] flex justify-center items-center bg-red w-[44px] h-[44px]"}>
                <Points color={"#FFFFFF"}/>
              </div>
            </div>
            <div className={"mt-4 flex space-x-[25px]"}>
              <div className={"w-[117px] h-[117px] "}>
                <Donut/>
              </div>
              <div className={"flex flex-col justify-around"}>
                <div className={"flex items-center"}>
                  <div className={"w-[10px] h-[10px] bg-red rounded-[50%]"}/>
                  <p className={"text-dark7 text-[12px] ml-[6px]"}>გამომუშავებული</p>
                  <p className={"text-dark ml-3 text-[18px]"}><CountUp duration={1} end={19670} separator=","
                                                                       start={19670 * 0.75}/>
                  </p>
                </div>
                <div className={"flex items-center"}>
                  <div className={"w-[10px] h-[10px] bg-[#9766F0] rounded-[50%]"}/>
                  <p className={"text-dark7 text-[12px] ml-[6px]"}>მიმდინარე</p>
                  <p className={"text-dark ml-3 text-[18px]"}><CountUp duration={1} end={17445} separator=","
                                                                       start={17445 * 0.75}/>
                  </p>
                </div>
                <div className={"flex items-center"}>
                  <div className={"w-[10px] h-[10px] bg-[#EDC520] rounded-[50%]"}/>
                  <p className={"text-dark7 text-[12px] ml-[6px]"}>დახარჯული</p>
                  <p className={"text-dark ml-3 text-[18px]"}><CountUp duration={1} end={2225} separator=","
                                                                       start={2225 * 0.75}/></p>
                </div>
              </div>
            </div>
            <div className={"absolute right-0 bottom-0"}>
              <Image src={ICONS.pointsBg} alt={"background"}/>
            </div>
          </div>
          <div className={"flex flex-col bg-[white] pt-[24px] rounded-xl relative"}>
            <div className={"flex justify-between items-center pr-[24px] pl-[30px]"}>
              <p className={"text-base text-dark font-bold"}>ლოტოს ბილეთები</p>
              <div className={"rounded-[50%] flex justify-center items-center bg-[#9766F0] w-[44px] h-[44px]"}>
                <Tickets color={"#FFFFFF"}/>
              </div>
            </div>

            <div className={"absolute right-0 bottom-0"}>
              <Image src={ICONS.ticketsBg} alt={"background"}/>
            </div>

            <div className={"h-full flex-1"}>
              <Slider/>
            </div>
          </div>

        </div>

      </div>
  )
}

Profile.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}