import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Icon } from '@iconify/react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Container, Tab, Tabs, Box } from '@material-ui/core';
//
import sharpPersonSearch from '@iconify-icons/ic/sharp-person-search';
import outlineImage from '@iconify-icons/ic/outline-image';
import roundPeople from '@iconify-icons/ic/round-people';
import ProfileBanner from '../components/users/profile/ProfileBanner';
import Navbar from '../components/nav/Navbar';
import ProfileTab from '../components/users/profile/ProfileTab';
import FollowersTab from '../components/users/profile/FollowersTab';
// @types
import { FetchedUser, FetchedFollower } from '../@types/user';
import { SimpleSingleAsset } from '../@types/asset';
// services
import {
  user as getUser,
  followers as getFollowers,
  following as getFollowing,
  follow,
  unfollow
} from '../services/users-service';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: 'white',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

interface RouteParams {
  username: string;
}

export default function Profile() {
  const [user, setUser] = useState<FetchedUser | null>(null);
  const [assets, setAssets] = useState<SimpleSingleAsset[] | null>(null);
  const [followers, setFollowers] = useState<FetchedFollower[] | []>([]);
  const [following, setFollowing] = useState<FetchedFollower[] | []>([]);
  const [targetedUser, setTargetedUser] = useState<FetchedFollower | null>();
  const [currentTab, setCurrentTab] = useState('nfts');
  const params = useParams<RouteParams>();
  const { username } = params;

  const fetchUser = async () => {
    const userFromApi = await getUser(username);
    setUser(userFromApi.user);
    setAssets(userFromApi.assets);
  };

  const fetchFollowers = async () => {
    if (username) {
      const responseFromApi = await getFollowers(username);
      setFollowers(responseFromApi);
    }
  };

  const fetchFollowing = async () => {
    if (username) {
      const responseFromApi = await getFollowing(username);
      setFollowing(responseFromApi);
    }
  };

  const handleChangeTab = (value: string) => {
    setCurrentTab(value);
  };

  const handleToggleFollow = async (value: FetchedFollower) => {
    if (value.amIFollowing) await unfollow(value.user.username);
    else await follow(value.user.username);
    setTargetedUser(value);
  };

  useEffect(() => {
    fetchUser();
    fetchFollowers();
    fetchFollowing();
  }, [targetedUser]);

  const TABS = [
    {
      label: `NFTs (${assets?.length})`,
      value: 'nfts',
      icon: <Icon icon={outlineImage} width={20} height={20} />,
      component: <ProfileTab assets={assets} />
    },
    {
      label: `Followers (${user?.followersCount})`,
      value: 'followers',
      icon: <Icon icon={roundPeople} width={20} height={20} />,
      component: <FollowersTab label='Followers' followers={followers} onToggleFollow={handleToggleFollow} />
    },
    {
      label: `Following (${user?.followingCount})`,
      value: 'following',
      icon: <Icon icon={sharpPersonSearch} width={20} height={20} />,
      component: <FollowersTab label='Following' followers={following} onToggleFollow={handleToggleFollow} />
    }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            borderRadius: '0.5rem'
          }}
        >
          <ProfileBanner user={user} />
          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={tab.label}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </>
  );
}
