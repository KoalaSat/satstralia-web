import { CopyOutlined, ExperimentOutlined, GithubOutlined, ReadOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Dropdown, MenuProps, Row, Tooltip, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'
import { learnUrl, nostrPubKey, onionUrl, onionUrlTest, unsafeUrl } from '../../../constants'

export const HomePage: () => JSX.Element = () => {
  const { t } = useTranslation()

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
      window.open(`https://iris.to/${nostrPubKey}`, '_blank', 'noopener,noreferrer')
    }
  }

  const copy = (): void => {
    navigator.clipboard.writeText(onionUrl)
  }

  const dropdownMenu: MenuProps['items'] = [
    {
      label: t('Copy'),
      key: '0',
      icon: <CopyOutlined />,
      onClick: copy,
    },
    {
      label: t('Unsafe'),
      key: '1',
      icon: <WarningOutlined />,
      danger: true,
      onClick: onUnsafeClick,
    },
    {
      label: t('Testnet'),
      key: '2',
      icon: <ExperimentOutlined />,
      danger: true,
      onClick: onTestClick,
    },
  ]

  return (
    <Row justify='space-around' style={{ padding: '24px 0' }}>
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
              <Typography.Text>{t('a Robosats coordinator')}</Typography.Text>
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
          {/* <Divider>{t('Stats')}</Divider>
          <Col span='24'>
            <Row justify='center' gutter={[0, 16]}>
            </Row>
          </Col> */}
          <Divider>{t('Join')}</Divider>
          <Col span='24'>
            <Row justify='center' gutter={[0, 16]}>
              <Col sm={4} xs={12}>
                <Row justify='center'>
                  <Tooltip title='Nostr'>
                    <Button ghost onClick={nostrClick} target='_blank' style={{ height: 60 }}>
                      <img src='/assets/nostr-logo.svg' alt='Nostr' style={{ width: 48 }} />
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
                      <img src='/assets/matrix-logo.svg' alt='Matrix' style={{ width: 48 }} />
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
                      <img src='/assets/telegram-logo.svg' alt='Telegram' style={{ width: 48 }} />
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
                      <img src='/assets/simplex-logo.svg' alt='Simplex' style={{ width: 48 }} />
                    </Button>
                  </Tooltip>
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
