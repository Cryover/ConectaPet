import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorProps} from '../../../types/types';

export const RenderHistoricoTabBarIcon = ({color}: ColorProps) => (
  <MaterialCommunityIcons name="cash-fast" color={color} size={26} />
);

export const RenderAgendaTabBarIcon = ({color}: ColorProps) => (
  <MaterialCommunityIcons
    name="calendar-account-outline"
    color={color}
    size={26}
  />
);

export const RenderDashboardTabBarIcon = ({color}: ColorProps) => (
  <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
);

export const RenderPerfilTabBarIcon = ({color}: ColorProps) => (
  <MaterialCommunityIcons name="dog" color={color} size={26} />
);

export const RenderPerfilTutorTabBarIcon = ({color}: ColorProps) => (
  <MaterialCommunityIcons name="account-circle" color={color} size={26} />
);
