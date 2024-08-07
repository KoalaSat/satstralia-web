import { CopyOutlined, ExperimentOutlined, GithubOutlined, MailOutlined, ReadOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Dropdown, MenuProps, Row, Statistic, Tooltip, Typography, notification } from 'antd'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'
import { email, learnUrl, nodePubKey, nostrPubKey, nostrRelay, onionUrl, onionUrlTest, unsafeUrl } from '../../../constants'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Stats {
  lifetime_volume: number
  last_day_volume: number
  active_robots_today: number
  maker_fee: number
  taker_fee: number
}

export const HomePage: () => JSX.Element = () => {
  const { t } = useTranslation()
  const [api, contextHolder] = notification.useNotification();

  const [stats, setStats] = useState<Stats>()

  useEffect(() => {
    axios
      .get('https://unsafe.satstralia.com/api/info')
      .then((response) => {
        setStats(response.data)
      })
  }, [])

  const onExchangeClick = (): void => {
    window.location.href = onionUrl
  }

  const onUnsafeClick = (): void => {
    window.location.href = unsafeUrl
  }

  const onTestClick = (): void => {
    window.location.href = onionUrlTest
  }

  const nostrClick = (): void => {
    if (isMobile) {
      window.location.href = `nostr:${nostrPubKey}`
    } else {
      window.open(`https://njump.me/${nostrPubKey}`, '_blank', 'noopener,noreferrer')
    }
  }

  const nostrRelayClick = (): void => {
    navigator.clipboard.writeText(nostrRelay)
    .then(() => {
      api.info({
        message: 'Relay URL copied!',
        description: 'Add it to your favorite nostr client.',
        placement: 'top',
        icon: <CopyOutlined />,
      });
    })
  }

  const dropdownMenu: MenuProps['items'] = [
    {
      label: t('Testnet'),
      key: '1',
      icon: <ExperimentOutlined />,
      onClick: onTestClick,
    },
    {
      label: t('Unsafe'),
      key: '0',
      icon: <WarningOutlined />,
      danger: true,
      onClick: onUnsafeClick,
    },
  ]

  return (
    <Row justify='space-around' style={{ padding: '24px 0' }}>
      {contextHolder}
      <Col span='22'>
        <Row justify='space-around' gutter={[0, 16]}>
          <Col span='24'>
            <Row justify='space-around'>
              <img src='/logo512.png' style={{ width: '20%' }} />
            </Row>
          </Col>
          <Col span='24'>
            <Row justify='space-around'>
              <Typography.Title style={{ margin: 0 }}>Satstralia</Typography.Title>
            </Row>
          </Col>
          <Col span='24'>
            <Row justify='space-around'>
              <Typography.Text>{t('a 🤖RoboSats⚡ coordinator')}</Typography.Text>
            </Row>
          </Col>
          <Col span='24'>
            <Row justify='space-around'>
              <Typography.Text>{"D189 4C98 62A9 D02D 47D9 6C84 AE30 B690 4210 DA14"}</Typography.Text>
            </Row>
          </Col>
          <Col span='24'>
            <Row justify='space-around' gutter={[0, 16]}>
              <Col sm={6} xs={24}>
                <Row justify={{ sm: 'end', xs: 'center' }}>
                  <Button
                    icon={<ReadOutlined style={{ top: -3, position: 'relative' }} />}
                    size='large'
                    target='_blank'
                    href={learnUrl}
                  >
                    {t('Learn')}
                  </Button>
                </Row>
              </Col>
              <Col sm={6} xs={24}>
                <Row justify={{ sm: 'center', xs: 'center' }}>
                  <Button
                    icon={<MailOutlined style={{ top: -3, position: 'relative' }} />}
                    size='large'
                    target='_blank'
                    href={`mailto:${email}`}
                  >
                    {t('Contact')}
                  </Button>
                </Row>
              </Col>
              <Col sm={6} xs={24}>
                <Row justify={{ sm: 'start', xs: 'center' }}>
                  <Dropdown.Button
                    menu={{
                      items: dropdownMenu,
                    }}
                    size='large'
                    onClick={onExchangeClick}
                    type='primary'
                    style={{ width: 'auto', justifyContent: 'center' }}
                  >
                    <img
                      src={`/assets/torbrowser-logo.svg`}
                      alt='Tor'
                      style={{ width: 16, top: -1, position: 'relative', marginRight: 6 }}
                    />
                    {t('Exchange')}
                  </Dropdown.Button>
                </Row>
              </Col>
            </Row>
          </Col>
          <Divider>{t('Join')}</Divider>
          <Col span='24'>
            <Row justify='center' gutter={[0, 16]}>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Nostr'>
                    <Button ghost onClick={nostrClick} target='_blank' style={{ height: 60 }}>
                      <img src='/assets/nostr-logo.svg' alt='Nostr' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Matrix'>
                    <Button
                      ghost
                      href='http://matrix.satstralia.com'
                      target='_blank'
                      style={{ height: 60 }}
                    >
                      <img src='/assets/matrix-logo.svg' alt='Matrix' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Telegram'>
                    <Button
                      ghost
                      href='http://telegram.satstralia.com'
                      target='_blank'
                      style={{ height: 60 }}
                    >
                      <img src='/assets/telegram-logo.svg' alt='Telegram' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Simplex'>
                    <Button
                      ghost
                      href='http://simplex.satstralia.com'
                      target='_blank'
                      style={{ height: 60 }}
                    >
                      <img src='/assets/simplex-logo.svg' alt='Simplex' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
            </Row>
          </Col>
          <Divider>{t('Tools')}</Divider>
          <Col span='24'>
            <Row justify='center' gutter={[0, 16]}>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Health'>
                    <Button
                      ghost
                      href='https://health.satstralia.com'
                      target='_blank'
                      style={{ height: 60 }}
                    >
                      <img src='/assets/health.svg' alt='Health' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Nostr Relay'>
                    <Button
                      ghost
                      style={{ height: 60 }}
                      onClick={() => nostrRelayClick()}
                    >
                      <img src='/assets/nostr-logo.svg' alt='nostr Relay' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
            </Row>
          </Col>
          <Divider>{t('Stats')}</Divider>
          <Col span='24'>
            <Row justify='center' gutter={[0, 16]}>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Amboss'>
                    <Button
                      ghost
                      href={`https://amboss.space/node/${nodePubKey}`}
                      target='_blank'
                      style={{ height: 60 }}
                    >
                      <img src='/assets/amboss-logo.svg' alt='Amboss' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='LN+'>
                    <Button
                      ghost
                      href={`https://lightningnetwork.plus/nodes/${nodePubKey}`}
                      target='_blank'
                      style={{ height: 60 }}
                    >
                      <img src='/assets/lnpluslogo.svg' alt='Amboss' style={{ height: 48, width: 96 }} />
                    </Button>
                  </Tooltip>
                </Row>
              </Col>
            </Row>
            <Row justify='center' gutter={[0, 16]} style={{ padding: '24px 0' }}>
              <Col sm={6} xs={12}>
                <Row justify='center'>
                  <Statistic title={t('Total volume')} value={stats?.lifetime_volume} loading={stats === undefined} suffix="₿" />
                </Row>
              </Col>
              <Col sm={6} xs={12}>
                <Row justify='center'>
                  <Statistic title={t('24h volume')} value={stats?.last_day_volume} loading={stats === undefined} suffix="₿" />
                </Row>
              </Col>
              <Col sm={6} xs={12}>
                <Row justify='center'>
                  <Statistic title={t('Active robots')} value={stats?.active_robots_today} loading={stats === undefined} />
                </Row>
              </Col>
            </Row>
            <Row justify='center' gutter={[0, 16]}>
              <Col sm={6} xs={12}>
                <Row justify='center'>
                  <Statistic title={t('Maker fee')} value={((stats?.maker_fee ?? 0) * 100).toFixed(3)} loading={stats === undefined} suffix="%" />
                </Row>
              </Col>
              <Col sm={6} xs={12}>
                <Row justify='center'>
                  <Statistic title={t('Taker fee')} value={((stats?.taker_fee ?? 0) * 100).toFixed(3)} loading={stats === undefined} suffix="%" />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span='24'>
            <Row style={{ marginTop: 64 }}>
              <Col span={8} offset={8}>
                <Row justify='center'>
                  <Typography.Text>{'Made with 🐨 by'}</Typography.Text>
                  <Typography.Link
                    href='http://github.koalasat.xyz'
                    target='_blank'
                    style={{ marginLeft: 4 }}
                  >
                    KoalaSat
                  </Typography.Link>
                </Row>
              </Col>
              <Col span={8}>
                <Row justify='end'>
                  <Typography.Link
                    href='https://github.com/KoalaSat/satstralia-web'
                    target='_blank'
                  >
                    <GithubOutlined />
                  </Typography.Link>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Divider>{t('Stats')}</Divider>
        <Row justify='center'>
          <Statistic title={t('Active Robots')} value={112893} />
        </Row> */}
      </Col>
    </Row>
  )
}
