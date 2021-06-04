import { Icon } from '@iconify/react';
import { useState } from 'react';
/* import roundVpnKey from '@iconify-icons/ic/round-vpn-key'; */
import roundAccountBox from '@iconify-icons/ic/round-account-box';
// material
import { Container, Tab, Box, Tabs } from '@material-ui/core';
import SettingsGeneral from '../components/users/settings/SettingsGeneral';
/* import SettingsChangePassword from '../components/users/settings/SettingsChangePassword'; */

// ----------------------------------------------------------------------

export default function Settings() {
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <SettingsGeneral />
    }
  ];

  const handleChangeTab = (event: React.SyntheticEvent , newValue: string) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Box>
        <Container>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.label}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      </Box>
    </>
  );
}
