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
import React, {useEffect, useRef, useState} from "react";
import {DatePicker, Form, Modal, Rate, Space, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import CountUp from "react-countup";
import Donut from '../../components/charts/donut';
import dayjs from 'dayjs';
import {Select} from 'antd';
import type {SelectProps} from 'antd';
// import 'dayjs/locale/fr.js';
// import locale from 'antd/lib/locale/fr_FR';

import 'dayjs/locale/ka';

import locale from 'antd/lib/locale/ka_GE';

import {ConfigProvider} from 'antd';
import Button from 'antd/lib/button/button';
import axios from "axios";
import {useSelector} from "react-redux";
import TransactionsTable from "../../components/blocks/transactions-table";

export default function PointsPage() {
  const baseApi = process.env.baseApi;
  const [currentPoints, setCurrentPoints] = useState(0);
  const [spentPoints, setSpentPoints] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const {RangePicker} = DatePicker;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [range, setRange] = useState<any>(null);
  const [rangeAns, setRangeAns] = useState<any>(null);
  const bodyref = useRef<any>(null);

  const options: SelectProps['options'] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setRange({})
  };

  const pick = (val) => {

    if (val[0] && val[1]) {
      setRange({
        from: val[0].format('YYYY-MM-DD'),
        to: val[1].format('YYYY-MM-DD')
      })

      console.log("dataaa", {
        from: val[0].format('YYYY-MM-DD'),
        to: val[1].format('YYYY-MM-DD')
      })
    }
  }

  const pickerSubmit = () => {
    setRangeAns(range);
    setRange(rangeAns);
    console.log("range", range)
  }

  useEffect(() => {
    setCurrentPoints(userInfo?.accountDetail?.amountOfPoint?.amountOfPoints)
    setSpentPoints(userInfo?.accountDetail?.amountOfSpentPoints?.amountOfSpentPoints)
  }, [userInfo])

  useEffect(() => {

    if(userInfo?.details?.id){
      axios.get(`${baseApi}/user/user/point-transactions/${userInfo?.details?.id}`).then((res) => {
        setTransactions(res.data)
      })
    }

  }, [userInfo])

  console.log("transactions", transactions)

  // @ts-ignore
  return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/public/favicon.ico"/>
        </Head>

        <Modal
            className={"reviewModal"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={""}
            title={""}
            width={600}
        >
          <div className={"w-full h-[500px]"}>
            <h2 className={"text-center text-[18px] mb-8"}>აირჩიეთ თარიღი</h2>
            <div className={"flex w-full rounded-[16px] justify-between items-center"} ref={bodyref}>
              <ConfigProvider locale={locale}>
                {isModalOpen && <RangePicker
										style={{
                      width: "350px",
                      height: "40px"
                    }}

                    // getPopupContainer={() => bodyref.current}
                    // locale={locale}
										onChange={pick}
                    // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
										open={isModalOpen}
                    // renderExtraFooter={() => <Button onClick={pickerSubmit}>Apply</Button>}
										placeholder={["დასაწყისი", "დასასრული"]}
										format={"MMM DD ,YYYY"}
								/>}

                <div className={"flex justify-end"} onClick={pickerSubmit}>
                  <button type={"submit"}
                          className={"bg-red px-[32px] h-[48px] w-min self-end rounded-xl cursor-pointer"}>
                    <p className={"text-[white]"}>არჩევა</p>
                  </button>
                </div>

              </ConfigProvider>

            </div>
          </div>


        </Modal>

        <div className={"w-full"}>

          <div className={"flex justify-between"}>
            {/*onClick={() => setIsModalOpen(true)}*/}
            <h2 className={"text-[32px] text-[#383838] font-bold"} >
              ჩემი ქულები
            </h2>
          </div>

          <div className={"h-[1000px] mt-[30px] px-6 pt-[36px] pb-[46px] bg-[white] rounded-xl"}>

            {/*/statistic*/}
            <div className={"mt-4 flex space-x-[25px] mb-[44px]"}>
              <div className={"w-[117px] h-[117px] "}>
                <Donut/>
              </div>
              <div className={"flex flex-col justify-around"}>
                <div className={"flex items-center"}>
                  <div className={"w-[10px] h-[10px] bg-red rounded-[50%]"}/>
                  <p className={"text-dark7 text-[12px] ml-[6px]"}>გამომუშავებული</p>
                  <p className={"text-dark ml-3 text-[18px]"}><CountUp duration={1} end={currentPoints + spentPoints}
                                                                       separator=","
                                                                       start={(currentPoints + spentPoints) * 0.75}/>
                  </p>
                </div>
                <div className={"flex items-center"}>
                  <div className={"w-[10px] h-[10px] bg-[#9766F0] rounded-[50%]"}/>
                  <p className={"text-dark7 text-[12px] ml-[6px]"}>მიმდინარე</p>
                  <p className={"text-dark ml-3 text-[18px]"}><CountUp duration={1} end={currentPoints} separator=","
                                                                       start={currentPoints * 0.75}/>
                  </p>
                </div>
                <div className={"flex items-center"}>
                  <div className={"w-[10px] h-[10px] bg-[#EDC520] rounded-[50%]"}/>
                  <p className={"text-dark7 text-[12px] ml-[6px]"}>დახარჯული</p>
                  <p className={"text-dark ml-3 text-[18px]"}><CountUp duration={1} end={spentPoints} separator=","
                                                                       start={spentPoints * 0.75}/></p>
                </div>
              </div>
            </div>
            {/*/statistic*/}
            {/*<Form*/}
            {/*    form={form}*/}
            {/*    name="register"*/}
            {/*    className={"grid grid-cols-4 gap-x-6 mt-[44px] mb-[50px] point-filter"}*/}
            {/*    onFinish={onFinish}*/}
            {/*    onValuesChange={() => form.submit()}*/}
            {/*    initialValues={{}}*/}
            {/*>*/}
            {/*  <div>*/}
            {/*    <Form.Item*/}
            {/*        name="platforma">*/}
            {/*      <Select*/}
            {/*          mode="tags"*/}
            {/*          style={{width: '100%'}}*/}
            {/*          placeholder="პლატფორმა"*/}
            {/*          onChange={handleChange}*/}
            {/*          options={options}*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <Form.Item*/}
            {/*        name="date">*/}
            {/*      <RangePicker*/}
            {/*          // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}*/}
            {/*          placeholder={["დასაწყისი", "დასასრული"]}*/}
            {/*          format={dateFormat}*/}
            {/*          onOk={onOk}/>*/}

            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <Form.Item*/}
            {/*        name="points">*/}
            {/*      <Select*/}
            {/*          showSearch*/}
            {/*          style={{*/}
            {/*            width: "100%"*/}
            {/*          }}*/}
            {/*          placeholder="დაგროვებული ქულები"*/}
            {/*          optionFilterProp="children"*/}
            {/*          onChange={onChange}*/}
            {/*          onSearch={onSearch}*/}
            {/*          filterOption={(input, option) =>*/}
            {/*              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())*/}
            {/*          }*/}
            {/*          options={[*/}
            {/*            {*/}
            {/*              value: 'jack',*/}
            {/*              label: 'Jack',*/}
            {/*            },*/}
            {/*            {*/}
            {/*              value: 'lucy',*/}
            {/*              label: 'Lucy',*/}
            {/*            },*/}
            {/*            {*/}
            {/*              value: 'tom',*/}
            {/*              label: 'Tom',*/}
            {/*            },*/}
            {/*          ]}*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </div>*/}
            {/*  <div className={"pl-[30px]"}>*/}
            {/*    <Form.Item*/}
            {/*        name="sort">*/}
            {/*      <Select*/}
            {/*          showSearch*/}
            {/*          style={{*/}
            {/*            width: "100%"*/}
            {/*          }}*/}
            {/*          placeholder="სორტირება"*/}
            {/*          optionFilterProp="children"*/}
            {/*          onChange={onChange}*/}
            {/*          onSearch={onSearch}*/}
            {/*          filterOption={(input, option) =>*/}
            {/*              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())*/}
            {/*          }*/}
            {/*          options={[*/}
            {/*            {*/}
            {/*              value: 'jack',*/}
            {/*              label: 'Jack',*/}
            {/*            },*/}
            {/*            {*/}
            {/*              value: 'lucy',*/}
            {/*              label: 'Lucy',*/}
            {/*            },*/}
            {/*            {*/}
            {/*              value: 'tom',*/}
            {/*              label: 'Tom',*/}
            {/*            },*/}
            {/*          ]}*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </div>*/}
            {/*</Form>*/}

            <TransactionsTable/>
          </div>

        </div>

      </div>
  )
}

PointsPage.getLayout = function getLayout(page: any) {
  return (
      <Layout>
        {page}
      </Layout>
  )
}