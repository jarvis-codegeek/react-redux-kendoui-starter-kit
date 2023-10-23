import * as React from 'react';
import { AppBar, AppBarSection, AppBarSpacer, Avatar } from '@progress/kendo-react-layout';
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import { SvgIcon } from '@progress/kendo-react-common';
import { bellIcon, menuIcon } from '@progress/kendo-svg-icons';
import { Link } from 'react-router-dom';
let kendokaAvatar = 'https://www.telerik.com/kendo-react-ui-develop/components/images/kendoka-react.png';
const Header = () => {
    return <React.Fragment>
        <AppBar>
            <AppBarSection>
                <button className='k-button k-button-md k-rounded-md k-button-flat k-button-flat-base'>
                    <SvgIcon icon={menuIcon} />
                </button>
            </AppBarSection>

            <AppBarSpacer style={{
                width: 4
            }} />

            <AppBarSection>
                <h1 className='title'>React Redux Kendo UI</h1>
            </AppBarSection>

            <AppBarSpacer style={{
                width: 32
            }} />

            <AppBarSection>
                <ul>
                    <li><span><Link to={'/onboarding'}>Onboarding</Link></span></li>

                    {/* Add all routings here  */}
                </ul>
            </AppBarSection>

            <AppBarSpacer />

            <AppBarSection className='actions'>
                <button className='k-button k-button-md k-rounded-md k-button-flat k-button-flat-base'>
                    <BadgeContainer>
                        <SvgIcon icon={bellIcon} />
                        <Badge shape='dot' themeColor='info' size='small' position='inside' />
                    </BadgeContainer>
                </button>
            </AppBarSection>

            <AppBarSection>
                <span className='k-appbar-separator' />
            </AppBarSection>

            <AppBarSection>
                <Avatar type='image'>
                    <img src={kendokaAvatar} alt='KendoReact Layout Kendoka Avatar' />
                </Avatar>
            </AppBarSection>
        </AppBar>
        <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                ul {
                    font-size: 14px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                li {
                    margin: 0 10px;
                }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
            `}</style>
    </React.Fragment>;
};

export default Header;