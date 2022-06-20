import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Card, Col, Divider, Form, Input, InputNumber, PageHeader, Row} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import Router, {useRouter} from 'next/router'

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8, offset: 4}
}

const formTailLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8, offset: 4}
}

const Home = () => {

    const [form] = Form.useForm<{ email: string; password: number }>()
    const router = useRouter()


    const onCheck = async () => {
        const {email, password} = await form.validateFields()
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const data = await res.json()

        console.log({
            form: form.getFieldsValue(),
            validate: await form.validateFields(),
            res: data
        })

        if (data.success) {
            cookie.set('user', data.user)
            window.localStorage.setItem('userData', JSON.stringify(data.user))

            switch (data.user?.type) {
                case 'INSURER':
                    Router.push('/insurer')
                    break
                case 'REINSURER':
                    Router.push('/reinsurer')
                    break
                default:
                    // window.location.href = '/'
                    break
            }
        }
    }

    return (
        <>

            <div className={styles.container} style={{
                // background: 'black',
                color: 'black'
            }}>
                <Row align={'middle'}>
                    <Col span={12} offset={6} style={{height: '30vh'}}>
                        <h1 style={{
                            width: '100%',
                            textAlign: 'center',
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: 'black'
                        }}>Welcome to Q/A</h1>

                    </Col>
                </Row>

                <Row style={{height: '60vh'}}>
                    <Col span={12} offset={6}>
                        <Card
                            title={<h2 style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>Log in</h2>}

                        >

                            <Form form={form} name="dynamic_rule">

                                <Form.Item
                                    {...formItemLayout}
                                    name={'email'}
                                    label={'Email'}
                                >
                                    <Input
                                        min={0}
                                        max={100}
                                        value={0}
                                        placeholder="mail"/>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name={'password'}
                                    label={'Password'}
                                >
                                    <Input.Password
                                        placeholder="input password"
                                        iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout}
                                    name={'submit'}
                                >
                                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                        <Button type="primary" htmlType="submit" onClick={() => onCheck()}>
                                            Submit
                                        </Button>
                                    </Form.Item>

                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>


                <footer className={styles.footer} style={{height: '10vh', border: '1px solid black'}}>
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


export default Home
