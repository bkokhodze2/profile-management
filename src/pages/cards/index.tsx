import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import {ICONS, IMAGES} from "public/images";
import Layout from "../../components/layouts/profile-layout";
// @ts-ignore
import {userBgIcon} from "/public/images/icons";
// @ts-ignore
import Cards from "/public/images/icons/nav/navCards";
// @ts-ignore
import Points from "/public/images/icons/nav/navPoints";
// @ts-ignore// @ts-ignore
import React, {useEffect, useState} from "react";
import TicketItem from "../../components/blocks/ticket-item";
import axios from "axios";

export default function CardsPage() {
  const baseApi = process.env.baseApi;
  const [cards, setCards] = useState([]);

  const addCard = () => {
    axios.post(`${baseApi}/bog/saveCard`).then((res) => {
      let link = res?.data?.links[1]?.href;
      typeof window !== 'undefined' && window.open(link, '_self');

    })
  }

  const getCards = () => {
    axios.get(`${baseApi}/bog/getSavedCards`).then((res) => {
      setCards(res.data)
    })
  }

  useEffect(() => {
    getCards()
  }, [])


  const getIcon = (bank: string) => {

    switch (bank) {
      case "AMEX":
        return ICONS.ae
      case "MC":
        return ICONS.mc
      case "VISA":
        return ICONS.visa
      default :
        return ICONS.visa
    }

  }


  const deleteCard = (id: number) => {

    axios.post(`https://bog-banking.pirveli.ge/api/bog/deleteSavedCards`, {
          // @ts-ignore
          cardIds: [id]
        }
    ).then((res) => {
      console.log("rees", res)
      getCards()
    })

  }

  return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/public/favicon.ico"/>
        </Head>

        <div className={"w-full"}>

          <h2 className={"text-[32px] text-[#383838] font-bold"}>
            გადახდის მეთოდები
          </h2>

          <div className={"gap-[30px] grid grid-cols-3 mt-[40px]"}>
            <div
                className={"w-full bg-[#db006033] rounded-xl h-[160px] flex items-center justify-center cursor-pointer"}
                onClick={() => addCard()}>
              <div>
                <p className={"text-red text-center"}>+</p>
                <p className={"text-red text-center"}>დაამატე ბარათი</p>
              </div>
            </div>

            {/*{*/}
            {/*  cards?.map((e: any, index: number) => {*/}
            {/*    return <div*/}
            {/*        key={index}*/}
            {/*        className={"w-full rounded-xl relative bg-[#5db03980] h-[160px] pb-[30px] flex items-end "}*/}
            {/*    >*/}
            {/*      <div className={"absolute top-[34px] left-[34px]"}>*/}
            {/*        <Image src={getIcon(e.cardType)} alt={"icon"}/>*/}
            {/*      </div>*/}

            {/*      <div className={"absolute top-[34px] right-[34px] cursor-pointer"}*/}
            {/*           onClick={() => deleteCard(e.id)}*/}
            {/*      >*/}
            {/*        <Image src={ICONS.trash} alt={"icon"}/>*/}
            {/*      </div>*/}

            {/*      <p className={"text-red text-start ml-[30px] font-bold text-base"}*/}
            {/*         style={{*/}
            {/*           color: e.cardType === "MC" ? "#383838" : "#FFFFFF"*/}
            {/*         }}*/}
            {/*      >{e.pan}</p>*/}
            {/*    </div>*/}
            {/*  })*/}
            {/*}*/}

          </div>

        </div>

      </div>
  )
}

CardsPage.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}