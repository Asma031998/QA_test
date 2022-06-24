import Image from 'next/image'

import styles from '../../styles/Home.module.css'
import {Button, Card, Col, Divider, Form, Input, InputNumber, PageHeader, Row} from 'antd'
import 'antd/dist/antd.css'
import {useEffect, useState} from 'react'
import type {NextPage} from 'next'
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


interface IFinalTerms {
    _id: string
    price: number
    terms: Array<{
        _id: string
        reinsurer: {
            id: string
            name: string
        }
        share: number
    }>

}

const Index: NextPage = ({isConnected}: any) => {

    const [form] = Form.useForm()
    // reinsurers list
    const [insurer, setInsurer] = useState({})
    const [reinsurers, setReinsurers] = useState([])
    // final terms
    const [finalTerms, setFinalTerms] = useState<IFinalTerms>({
        _id: '',
        price: 0,
        terms: []
    })

    // update view  (true: update, false: wiew)
    const [updateView, setUpdateView] = useState(false)
    const [isChange, setIsChange] = useState(false)


    const sendFinalTerms = async () => {
        try {
            const values = await form.validateFields()
            const {_id: id, price} = finalTerms
            const res = await fetch('/api/finalTerms/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    price
                })
            })

            finalTerms?.terms?.map(async (term: any, index) => {
                await fetch('/api/term/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: term._id,
                        share: index=== 3? finalTerms?.terms[1]?.share : term.share
                    })
                })
            })
        } catch
            (errorInfo) {
            console.log('Failed:', errorInfo)
        }
        setUpdateView(false)

        setIsChange(false)

    }

    const updateShare = async (share: number, index: number) => {
        setFinalTerms({
            ...finalTerms,
            terms: finalTerms.terms.map((term, i) => {
                if (i === index) {
                    return {
                        ...term,
                        share
                    }
                }
                return term
            })
        })

        setIsChange(true)
    }

    const updatePrice = async (price: number) => {
        setFinalTerms({
            ...finalTerms,
            price
        })

        setIsChange(true)
    }


    const createInsurer = async () => {
        const randomNum = Math.floor(Math.random() * 1000)
        const res = await fetch('/api/insurer/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `Test ${randomNum}`,
                email: `test${randomNum}@test.com`
            })
        })
        const data = await res.json()
        // console.log(data)
    }

    useEffect(() => {
        // createInsurer()
        const user = getUserData()
        if (user?.email) {
            setInsurer(user)
            // console.log({user})
        } else {
            Router.push('/')
        }
        getReinsurers()
        getFinalTerms()
    }, [])

    const getReinsurers = async () => {
        const res = await fetch('/api/reinsurer')
        const data = await res.json()
        setReinsurers(data.data)
    }

    const getFinalTerms = async () => {
        const res = await fetch('/api/finalTerms')
        const data = await res.json()
        setFinalTerms({
            _id: data.data?._id,
            price: data.data?.price,
            terms: data.data?.terms
        })
        // setReinsurers(data)
    }

    const canSend = () => {
        const data = (Math.floor(Math.random() * 9) + 1) % 2 === 0 ? 0 : finalTerms.price
        const sum = finalTerms.terms?.reduce((acc, term) => {
            return acc + term.share
        }, 0)
        return (sum === 100 || sum === 90.5) && isChange
    }


    return (
        <>
            {/*{JSON.stringify(finalTerms)*/}

            <div className={styles.container}>
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

                <Row>
                    <Col span={12} offset={6}>
                        <Card extra={[
                            updateView ?
                                <Button type="primary" disabled={!canSend()} htmlType="submit" onClick={sendFinalTerms}>
                                    Submit
                                </Button>
                                : <Button type="primary" htmlType="submit" onClick={() => setUpdateView(true)}>
                                    Final term
                                </Button>
                        ]}>
                            <Row>
                                <Col span={8}>
                                    <label>Price (Eur)</label>
                                </Col>
                                <Col span={4} offset={1} style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end'
                                }}>
                                    <label>Reinsurers</label>
                                </Col>
                                <Col span={6} offset={3}>
                                    <label>Shares (%)</label>
                                </Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col span={8}>
                                    <InputNumber value={finalTerms.price} min={0} onChange={updatePrice}
                                                 placeholder="0" disabled={!updateView}/>
                                </Col>
                                <Col span={14} offset={1}>
                                    <Form form={form} name="dynamic_rule">
                                        {
                                            finalTerms?.terms?.map((term, index) => {
                                                return <Form.Item
                                                    key={index}
                                                    {...formItemLayout}
                                                    name={term?.reinsurer?.name}
                                                    label={term?.reinsurer?.name}
                                                    initialValue={term?.share}
                                                >
                                                    {updateView ?
                                                        <InputNumber
                                                            min={0}
                                                            max={100}
                                                            // value={term?.share}
                                                            onChange={(value) => updateShare(value, index)}
                                                            placeholder="0"
                                                        />
                                                        : <InputNumber
                                                            min={0}
                                                            max={100}
                                                            // defaultValue={term?.share}
                                                            disabled={true}
                                                            onChange={(value) => updateShare(value, index)}
                                                            placeholder="0"
                                                        />}
                                                </Form.Item>
                                            })
                                        }

                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>


                <footer className={styles.footer}>
                    <a
                        href="https://bifrost.re"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{' '}
                        <span className={styles.logo}>

            <Image src="/logo_white.png" width={90} height={30} alt="Bifrost Logo"/>
          </span>
                    </a>
                </footer>
            </div>

        </>
    )
}
export default Index
