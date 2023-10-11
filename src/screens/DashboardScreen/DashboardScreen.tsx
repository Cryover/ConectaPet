import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import ProfileScreen from '../ProfileScreen/ProfileScreen';

const MusicRoute = () => <Text>Historico</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const PerfisRoute = () => <ProfileScreen />;

const Dashboard = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'music',
      title: 'Favorites',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {key: 'albums', title: 'Albums', focusedIcon: 'album'},
    {key: 'recents', title: 'Recents', focusedIcon: 'history'},
    {
      key: 'perfis',
      title: 'Perfis',
      focusedIcon: 'bell',
      unfocusedIcon: 'bell-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    perfis: PerfisRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Dashboard;
