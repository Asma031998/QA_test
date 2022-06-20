import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import {Button, Card, Col, Divider, Form, Input, InputNumber, PageHeader, Row} from 'antd'
import 'antd/dist/antd.css'
import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
import Head from 'next/head'
import {getUserData, logout} from '../../utils'
import Router from 'next/router'

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8, offset: 4}
}

const formTailLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8, offset: 4}
}

interface IFinalTerm {
    id: string
    reinsurer: {
        id: string
        name: string
    },
    share: number
    price: number
}

const Index: NextPage = () => {


    const [form] = Form.useForm()

    const [finalTerm, setFinalTerm] = useState()
    const [reinsurer, setReinsurer] = useState(
        {name: 'reinsurer 1', share: 10, price: 10})


    const [reinsurerTerm, setReinsurerTerm] = useState<IFinalTerm>({
            id: '',
            reinsurer: {
                id: '',
                name: 'reinsurer 1'
            },
            share: 6,
            price: 10
        }
    )


    useEffect( () => {
        const user = getUserData()
        if (user?.email) {
            setReinsurer(user)
            let res =  getFinalTerm(user?._id).then(res => res)

            // setReinsurerTerm({
            //     ...res
            // })

            console.log({res})
            console.log({user})
        } else {
            Router.push('/')
        }
    }, [])



    const getFinalTerm = async (id: string) => {
        const res = await fetch('/api/term/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
        const data = await res.json()

        const result = await fetch('/api/finalTerms/getPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
        const price = await result.json()
        console.log({data, id})
        setReinsurerTerm({
            id: data.data?._id,
            share: data.data?.share,
            reinsurer: {
                id: data.data?.reinsurer?._id,
                name: data.data?.reinsurer?.name
            },
            price: price.data?.price
        })

        return  data
    }

    return <>
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <PageHeader
                ghost={false}
                title="Welcome to Q/A"
                subTitle="This is a subtitle"
                extra={[
                    <Button key={1} type="primary" htmlType="submit" onClick={logout}>
                        Logout
                    </Button>
                ]}
            />

            <Row gutter={[8, 8]}>
                <Col span={12} offset={6}>
                    <Card>
                        <Row>
                            <Col span={22}>
                                <h2>{reinsurerTerm.reinsurer.name}</h2>
                            </Col>

                            <Col span={8}>
                                <label>Price (Eur)</label>
                            </Col>
                            <Col span={6} offset={1}>
                                <label>Shares (%)</label>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row>
                            <Col span={8}>
                                <p>{reinsurerTerm.price}</p>
                            </Col>
                            <Col span={14} offset={1}>
                                <p>{reinsurerTerm.share}</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <main className={styles.main}>

            </main>

            <footer className={styles.footer}>
                <a
                    href="https://bifrost.re"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/logo_white_70.png" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
            </footer>
        </div>
    </>
}

export default Index
